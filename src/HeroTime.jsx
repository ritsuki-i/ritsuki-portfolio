import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import "./HeroTime.css";

/*
 * Hero: one room seen at three times of day. The current time is drawn as the base world; a lens that
 * follows the pointer shows the next time in exactly the same place. Holding the lens expands it into a
 * circular wipe that becomes the new world. Pointer tracking and animation run in requestAnimationFrame
 * and are written to CSS custom properties, so moving the lens never re-renders React.
 */

const asset = (path) => `${process.env.PUBLIC_URL}/${path}`;

const TIMES = ["day", "evening", "night"];
const NEXT = { day: "evening", evening: "night", night: "day" };
const LABEL = { day: "DAY", evening: "EVENING", night: "NIGHT" };
const JA = { day: "昼", evening: "夕方", night: "夜" };
const ALT = {
  day: "昼の部屋。テーブルのそばで鳩と過ごしている",
  evening: "夕方の部屋。机に向かって研究・制作をしている",
  night: "夜の部屋。ベッドで眠っている",
};

const HOLD_MS = 1000;
const WIPE_MS = 1150;
const REOPEN_MS = 520;
const HINT_KEY = "hero-lens-hint-seen";
const LOAD_TIMEOUT_MS = 10000;
// The title faces, loaded before the hero is revealed so no fallback font ever shows.
const TITLE_FONTS = ["600 40px Manrope", "600 40px Fraunces", "italic 600 40px \"Cormorant Garamond\""];

// Local time only picks the first world; after that the visitor's choice is kept.
const initialTime = () => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

// Deterministic scatter so decorations stay put between renders.
const scatter = (count, seed) => {
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => ({ x: rand() * 100, y: rand() * 100, size: rand(), delay: rand() }));
};
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const STARS = scatter(7, 7);
const BOKEH = scatter(16, 53);

/*
 * The world around the room is built in depth rather than with props: a deep sky, a few heavily blurred
 * city lights far away, a low haze that slowly drifts, and ambient light pooling under the room.
 */
function Scenery({ time }) {
  return (
    <>
      {time === "night" && STARS.map((star, i) => (
        <span key={i} className="night-star" style={{ left: `${45 + star.x * 0.55}%`, top: `${4 + star.y * 0.34}%`, "--size": `${1 + star.size * 1.2}px`, "--delay": `${-star.delay * 9}s` }} />
      ))}
      <span className="scene-bokeh">
        {BOKEH.map((dot, i) => (
          <i key={i} style={{ left: `${40 + dot.x * 0.6}%`, top: `${48 + dot.y * 0.3}%`, "--size": `${10 + dot.size * 26}px`, "--alpha": `${0.25 + dot.delay * 0.55}` }} />
        ))}
      </span>
      <span className="scene-haze"><i /><i /></span>
    </>
  );
}

function Ambient() {
  return (
    <div className="hero-ambient" aria-hidden="true">
      {TIMES.map((time) => (
        <div key={time} className={`ambient-layer sky-${time} ambient-${time}`}>
          <Scenery time={time} />
        </div>
      ))}
    </div>
  );
}

export default function HeroTime() {
  const [firstTime] = useState(initialTime);
  const [loader, setLoader] = useState("visible");
  const loaderRef = useRef(null);
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const ringRef = useRef(null);
  const lensWorldRef = useRef(null);
  const lensSkyRef = useRef(null);
  const titleRef = useRef(null);
  const enterNextRef = useRef(() => {});

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    const ring = ringRef.current;
    // Lens variables go only on the three lens elements, so a moving lens restyles just those subtrees.
    const title = titleRef.current;
    const lensTargets = [lensWorldRef.current, lensSkyRef.current, ring, title];
    const setVar = (name, value) => lensTargets.forEach((el) => el.style.setProperty(name, value));
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // The sticky header sits over the hero's world, so it needs to know the time of day and whether the hero is under it.
    const root = document.documentElement;
    root.dataset.heroAmbient = hero.dataset.ambient;
    const headerObserver = new IntersectionObserver(([entry]) => {
      root.dataset.heroUnderHeader = entry.isIntersecting ? "true" : "false";
    }, { rootMargin: "0px 0px -92% 0px" });
    headerObserver.observe(hero);
    const s = {
      x: 0, y: 0, tx: 0, ty: 0, baseR: 120, open: 0, hold: 0,
      holdStart: null, openAnim: null, wipe: null, raf: 0, last: 0,
      moved: false, pointerId: null, pointerType: "", downX: 0, downY: 0,
    };


    const measure = () => {
      const heroBox = hero.getBoundingClientRect();
      const visualBox = visual.getBoundingClientRect();
      s.vx = visualBox.left - heroBox.left;
      s.vy = visualBox.top - heroBox.top;
      s.hw = heroBox.width;
      s.hh = heroBox.height;
      s.baseR = ring.offsetWidth / 2 || 120;
      setVar("--vx", `${s.vx}px`);
      setVar("--vy", `${s.vy}px`);
      const titleBox = title.getBoundingClientRect();
      title.style.setProperty("--tx", `${titleBox.left - heroBox.left}px`);
      title.style.setProperty("--ty", `${titleBox.top - heroBox.top}px`);
      if (!s.moved) {
        s.tx = s.x = s.vx + visualBox.width * 0.56;
        s.ty = s.y = s.vy + visualBox.height * 0.5;
      }
      schedule();
    };

    const write = (r) => {
      setVar("--lx", `${s.x}px`);
      setVar("--ly", `${s.y}px`);
      setVar("--lr", `${Math.max(r, 0)}px`);
      setVar("--ring-s", `${Math.max(r, 0) / s.baseR}`);
      setVar("--hold", `${s.hold}`);
    };

    const promote = (now) => {
      // The wipe has covered the whole hero with the next world, so swapping the base underneath is invisible.
      hero.dataset.time = NEXT[hero.dataset.time];
      hero.classList.remove("is-wiping");
      s.wipe = null;
      s.hold = 0;
      s.open = 0;
      s.openAnim = { start: now + 260, from: 0, to: 1, dur: REOPEN_MS };
    };

    const startWipe = (now) => {
      const next = NEXT[hero.dataset.time];
      hero.classList.remove("is-holding");
      hero.dataset.ambient = next;
      root.dataset.heroAmbient = next;
      if (reduceQuery.matches) {
        // Reduced motion: no expanding circle, just a crossfade between worlds.
        hero.classList.add("is-crossfade");
        hero.dataset.time = next;
        s.hold = 0;
        s.open = 0;
        s.openAnim = { start: now + 900, from: 0, to: 1, dur: 1 };
        setTimeout(() => hero.classList.remove("is-crossfade"), 900);
        return;
      }
      const far = Math.max(Math.hypot(s.x, s.y), Math.hypot(s.hw - s.x, s.y), Math.hypot(s.x, s.hh - s.y), Math.hypot(s.hw - s.x, s.hh - s.y));
      s.wipe = { start: now, from: s.baseR * s.open * (1 - 0.05 * s.hold), to: far + 8 };
      hero.classList.add("is-wiping");
    };

    const tick = (now) => {
      s.raf = 0;
      const dt = s.last ? Math.min(now - s.last, 64) : 16;
      s.last = now;
      let active = false;

      const follow = reduceQuery.matches ? 1 : 1 - Math.pow(0.7, dt / 16.7);
      s.x += (s.tx - s.x) * follow;
      s.y += (s.ty - s.y) * follow;
      if (Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1) active = true;
      else { s.x = s.tx; s.y = s.ty; }

      if (s.holdStart !== null) {
        s.hold = Math.min(1, (now - s.holdStart) / HOLD_MS);
        active = true;
        if (s.hold >= 1) {
          s.holdStart = null;
          startWipe(now);
        }
      } else if (s.hold > 0 && !s.wipe) {
        s.hold = Math.max(0, s.hold - dt / 220);
        active = true;
      }
      if (s.holdStart === null && s.hold === 0) hero.classList.remove("is-holding");

      if (s.openAnim) {
        const t = Math.min(1, Math.max(0, (now - s.openAnim.start) / s.openAnim.dur));
        s.open = s.openAnim.from + (s.openAnim.to - s.openAnim.from) * easeOutCubic(t);
        if (t >= 1) s.openAnim = null;
        active = true;
      }

      let r = s.baseR * s.open * (1 - 0.05 * s.hold);
      if (s.wipe) {
        const t = Math.min(1, (now - s.wipe.start) / WIPE_MS);
        r = s.wipe.from + (s.wipe.to - s.wipe.from) * easeInOutCubic(t);
        active = true;
        if (t >= 1) {
          promote(now);
          r = 0;
        }
      }

      write(r);
      if (active) schedule();
      else s.last = 0;
    };

    function schedule() {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    }

    const local = (event) => {
      const box = hero.getBoundingClientRect();
      return [event.clientX - box.left, event.clientY - box.top];
    };

    const cancelHold = () => {
      if (s.holdStart === null) return;
      s.holdStart = null;
      schedule();
    };

    const onPointerMove = (event) => {
      if (s.wipe) return;
      const [x, y] = local(event);
      if (event.pointerType === "mouse") {
        s.moved = true;
        s.tx = x;
        s.ty = y;
        if (s.pointerId === event.pointerId && Math.hypot(x - s.downX, y - s.downY) > 30) cancelHold();
      } else if (s.pointerId === event.pointerId) {
        // Touch: a sideways drag moves the lens (vertical swipes are left to the browser via touch-action).
        if (Math.hypot(x - s.downX, y - s.downY) > 10) cancelHold();
        s.tx = x;
        s.ty = y;
      }
      schedule();
    };

    const onPointerDown = (event) => {
      if (s.wipe || event.button !== 0 || event.target.closest("a, button")) return;
      const [x, y] = local(event);
      s.pointerId = event.pointerId;
      s.pointerType = event.pointerType;
      s.downX = x;
      s.downY = y;
      if (event.pointerType !== "mouse") {
        // A tap places the lens where the finger is; keeping the finger down enters that world.
        s.moved = true;
        s.tx = x;
        s.ty = y;
      } else if (!event.target.closest(".hero-content")) {
        event.preventDefault();
      }
      if (Math.hypot(x - s.x, y - s.y) > s.baseR * 1.1 && event.pointerType === "mouse") return;
      s.holdStart = performance.now();
      hero.classList.add("is-holding");
      schedule();
    };

    const onPointerEnd = (event) => {
      if (event.pointerId !== s.pointerId) return;
      s.pointerId = null;
      cancelHold();
    };

    const onPointerLeave = (event) => {
      if (event.pointerType === "mouse") onPointerEnd(event);
    };

    const onContextMenu = (event) => {
      if (s.holdStart !== null) event.preventDefault();
    };

    enterNextRef.current = () => {
      if (s.wipe) return;
      s.hold = 1;
      startWipe(performance.now());
      schedule();
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerdown", onPointerDown);
    hero.addEventListener("pointerup", onPointerEnd);
    hero.addEventListener("pointercancel", onPointerEnd);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("contextmenu", onContextMenu);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    resizeObserver.observe(visual);
    resizeObserver.observe(title);
    measure();

    // Hold the page behind the loader until every world is decoded and the title fonts are in, so promoting an
    // image never flashes and no fallback font is ever seen. A timeout keeps a slow asset from blocking the page.
    let cancelled = false;
    const hintTimers = [];
    root.classList.add("is-loading");
    const assets = [
      ...[...hero.querySelectorAll("img")].map((img) => (img.decode ? img.decode() : Promise.resolve()).catch(() => {})),
      ...TITLE_FONTS.map((font) => (document.fonts ? document.fonts.load(font) : Promise.resolve()).catch(() => {})),
    ];
    let loaded = 0;
    assets.forEach((asset) => asset.then(() => {
      loaded += 1;
      loaderRef.current?.style.setProperty("--progress", `${loaded / assets.length}`);
    }));

    const reveal = () => {
      if (cancelled || hero.classList.contains("is-ready")) return;
      hero.classList.add("is-ready");
      root.classList.remove("is-loading");
      measure();
      setLoader("leaving");
      hintTimers.push(setTimeout(() => setLoader("gone"), 900));
      s.openAnim = { start: performance.now() + 700, from: 0, to: 1, dur: reduceQuery.matches ? 1 : 700 };
      schedule();

      // First visit only: a short, quiet hint, then it never shows again.
      let seen = true;
      try { seen = window.localStorage.getItem(HINT_KEY) === "1"; } catch { seen = true; }
      if (!seen) {
        hintTimers.push(setTimeout(() => hero.classList.add("show-hint"), 2400));
        hintTimers.push(setTimeout(() => {
          hero.classList.remove("show-hint");
          try { window.localStorage.setItem(HINT_KEY, "1"); } catch { /* storage unavailable */ }
        }, 5200));
      }
    };
    Promise.all(assets).then(reveal);
    hintTimers.push(setTimeout(reveal, LOAD_TIMEOUT_MS));

    return () => {
      cancelled = true;
      root.classList.remove("is-loading");
      cancelAnimationFrame(s.raf);
      resizeObserver.disconnect();
      headerObserver.disconnect();
      delete root.dataset.heroAmbient;
      delete root.dataset.heroUnderHeader;
      hintTimers.forEach(clearTimeout);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerdown", onPointerDown);
      hero.removeEventListener("pointerup", onPointerEnd);
      hero.removeEventListener("pointercancel", onPointerEnd);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return (
    <>
    {loader !== "gone" && (
      <div className={`page-loader ${loader === "leaving" ? "is-leaving" : ""}`} ref={loaderRef} role="status" aria-live="polite">
        <svg className="loader-ring" viewBox="0 0 100 100" aria-hidden="true"><circle className="loader-track" cx="50" cy="50" r="46" /><circle className="loader-arc" cx="50" cy="50" r="46" pathLength="1" /></svg>
        <span className="loader-name">RITSUKI ISHIKAWA</span>
        <span className="visually-hidden">読み込み中</span>
      </div>
    )}
    <section className="hero hero-time" ref={heroRef} data-time={firstTime} data-ambient={firstTime} aria-labelledby="hero-title">
      <div className="hero-ground" aria-hidden="true" />
      <Ambient />
      <div className="lens-sky" ref={lensSkyRef} aria-hidden="true">
        {TIMES.map((time) => <div key={time} className={`lens-sky-layer sky-${time} lens-sky-${time}`} />)}
      </div>

      <div className="hero-main">
        <div className="hero-content">
          <div className="eyebrow"><span className="status-dot" /> RITSUKI ISHIKAWA / PORTFOLIO</div>
          {/* One visually hidden heading for assistive tech; the three styled versions crossfade with the time of day. */}
          <h1 id="hero-title" className="hero-title" ref={titleRef}>
            <span className="visually-hidden">Curiosity × Impact</span>
            {TIMES.map((time) => <span key={time} className={`title-face title-base title-${time}`} aria-hidden="true">Curiosity <em>×</em> Impact</span>)}
            {/* Inside the lens the title is already written in the next time's style. */}
            {TIMES.map((time) => <span key={`lens-${time}`} className={`title-face title-lens title-${time} lens-title-${time}`} aria-hidden="true">Curiosity <em>×</em> Impact</span>)}
          </h1>
          <p className="hero-japanese">その交点に、まだ見ぬ景色がある。</p>
          <p className="hero-copy">人が触れて「面白い」と感じる体験を、実際に役立つ技術へ。<br />機械学習の研究と、Web UI の開発をしています。</p>
          <a className="round-link hero-link-desktop" href="#works"><span>作品を見る</span><ArrowDownRight size={19} /></a>
          <div className="hero-principles" aria-label="ものづくりの3つの軸">
            <div><span>01</span><strong>IDEA</strong><p>好奇心から、<br />つくる</p></div>
            <div><span>02</span><strong>TECH</strong><p>技術で、<br />広げる</p></div>
            <div><span>03</span><strong>IMPACT</strong><p>誰かの毎日を、<br />少しでもよくする</p></div>
          </div>
        </div>

        <div className="hero-visual" ref={visualRef}>
          {TIMES.map((time) => <span key={time} className={`visual-halo halo-${time}`} aria-hidden="true" />)}
          {TIMES.map((time) => (
            <img key={time} className={`room-art base-art base-${time}`} src={asset(`img/hero/${time}.webp`)} alt={ALT[time]} draggable="false" />
          ))}
          <div className="lens-world" ref={lensWorldRef} aria-hidden="true">
            {TIMES.map((time) => (
              <img key={time} className={`room-art lens-art lens-${time}`} src={asset(`img/hero/${time}.webp`)} alt="" draggable="false" />
            ))}
          </div>
        </div>

        <a className="round-link hero-link-mobile" href="#works"><span>作品を見る</span><ArrowDownRight size={19} /></a>
      </div>

      <div className="lens-ring" ref={ringRef} aria-hidden="true">
        <span className="lens-charge">
          <svg viewBox="0 0 100 100"><circle className="charge-track" cx="50" cy="50" r="50" /><circle className="charge-arc" cx="50" cy="50" r="50" pathLength="1" /></svg>
          <span className="charge-head"><i /></span>
        </span>
        <span className="lens-label">{TIMES.map((time) => <span key={time} className={`to-${time}`}>{LABEL[time]}</span>)}</span>
        <span className="lens-hint">Hold to enter another time.</span>
      </div>

      <button className="hero-time-enter" type="button" onClick={() => enterNextRef.current()}>
        {TIMES.map((time) => <span key={time} className={`to-${time}`}>{JA[time]}の時間へ移る</span>)}
      </button>

      <div className="hero-bottom"><span>SCROLL TO EXPLORE ↓</span><span>RESEARCH &amp; WEB DEVELOPMENT</span></div>
    </section>
    </>
  );
}
