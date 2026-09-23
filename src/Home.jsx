import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, Check, Copy, Github, Mail, Maximize2 } from "lucide-react";
import AppData from "./Data/AppData.json";
import AboutJourney from "./AboutJourney.jsx";
import HeroTime from "./HeroTime.jsx";
import "./Home.css";

// Newest first, by the date each work was last rebuilt.
const featuredNames = ["AirCursor", "PiPi Room", "Visual Stack", "COOK_WITH"];
const allWorks = [...AppData.apps, ...AppData.systems];
const workSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const workMeta = {
  AirCursor: { number: "01", date: "2026 Sep", firstDate: "2024 Oct", type: "REACT LIBRARY", color: "air", thumbnail: "AirCursor.png", effect: "AirCursor.webp", tech: "React / MediaPipe / Babel" },
  "PiPi Room": { number: "02", date: "2025 Apr", type: "COMMUNITY PLATFORM", color: "pipi", thumbnail: "PiPi_Room.png", effect: "PiPi_Room.webp", tech: "Next.js / Supabase / Drizzle ORM" },
  "Visual Stack": { number: "03", date: "2025 Feb", type: "INTERACTIVE GAME", color: "visual", thumbnail: "visual_stack.png", effect: "visual_stack.webp", tech: "Next.js / Unity / MediaPipe" },
  COOK_WITH: { number: "04", date: "2024 Jul", firstDate: "2022 Aug", type: "WEB APPLICATION", color: "cook", thumbnail: "cook_with.png", effect: "cook_with.webp", tech: "React / Flask / Selenium" },
};

const asset = (path) => `${process.env.PUBLIC_URL}/${path}`;

// Assembled at runtime so the address is not sitting in the HTML as a plain string for scrapers.
const contactEmail = ["ritsuki00ishikawa", "gmail.com"].join("@");

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
      <div data-reveal>
        <span className="section-kicker">04 / CONTACT</span>
        <h2 id="contact-title">Contact</h2>
      </div>
      <div className="contact-body" data-reveal style={{ "--reveal-delay": "0.1s" }}>
        <p className="contact-intro">制作や開発について、お気軽にご連絡ください。</p>
        <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        <div className="contact-actions">
          <a className="contact-button is-primary" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`} target="_blank" rel="noopener noreferrer"><Mail size={17} /> Gmailで作成</a>
          <a className="contact-button" href={`mailto:${contactEmail}`}><Mail size={17} /> メールアプリで作成</a>
          <button className="contact-button" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />} {copied ? "コピーしました" : "アドレスをコピー"}</button>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work, index, featured, compact, onSelect }) {
  const meta = workMeta[work.name];
  return (
    <article className={`work-card work-${meta.color}`} onClick={featured || compact ? undefined : onSelect} data-reveal style={{ "--reveal-delay": `${(index % 3) * 0.08}s`, viewTransitionName: `work-${workSlug(work.name)}` }} id={`work-${workSlug(work.name)}`}>
      {compact ? (
        <div className="work-art">
          <img src={asset(`img/thumbnail/${meta.thumbnail}`)} alt={`${work.name} の紹介画像`} loading="lazy" />
        </div>
      ) : featured ? (
        <a className="work-art" href={work.url} target="_blank" rel="noopener noreferrer" aria-label={`${work.name} の作品を見る`}>
          <img src={asset(`img/thumbnail/${meta.thumbnail}`)} alt={`${work.name} の紹介画像`} loading="lazy" />
          <span className="work-art-label" aria-hidden="true">VIEW PROJECT</span>
          <span className="work-art-arrow" aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.5} /></span>
        </a>
      ) : (
        <button className="work-art" type="button" aria-label={`${work.name} を大きく表示`}>
          <img src={asset(`img/thumbnail/${meta.thumbnail}`)} alt={`${work.name} の紹介画像`} loading="lazy" />
          <span className="work-art-label" aria-hidden="true">SHOW HERE</span>
          <span className="work-art-arrow" aria-hidden="true"><Maximize2 size={18} strokeWidth={1.6} /></span>
        </button>
      )}
      <div className="work-info">
        <div className="work-category"><span>{meta.number}</span><span>{meta.type}</span><time className="work-date">{meta.date}{meta.firstDate && <span>（初版 {meta.firstDate}・改築）</span>}</time></div>
        <h3><span>{work.name}</span></h3>
        <p className="work-description">{work.script}</p>
        <ul className="work-tech" aria-label="使用技術">{meta.tech.split(" / ").map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <div className="work-links">
          <a href={work.url} target="_blank" rel="noopener noreferrer">作品を見る <ArrowUpRight size={17} /></a>
          <a href={work.githuburl} target="_blank" rel="noopener noreferrer" aria-label={`${work.name} のGitHubリポジトリ`}><Github size={19} /></a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOrder, setWorkOrder] = useState(featuredNames);
  // On phones the cards form a single column, so images are not links or swap buttons.
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 700px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Clicking a smaller card swaps it with the large one, morphing between positions where View Transitions are supported.
  const showWork = (name) => {
    const swap = () => setWorkOrder((order) => {
      const next = [...order];
      const from = next.indexOf(name);
      [next[0], next[from]] = [next[from], next[0]];
      return next;
    });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) {
      // A skipped transition (e.g. the tab becomes hidden) still applies the swap; only the animation is dropped.
      const transition = document.startViewTransition(() => flushSync(swap));
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
    } else swap();
    document.getElementById("works")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    const scrollToInitialHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    };
    window.addEventListener("keydown", closeOnEscape);
    scrollToInitialHash();

    // Fade sections in as they enter the viewport. Without IntersectionObserver everything simply stays visible.
    let revealObserver;
    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("has-reveal");
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      document.querySelectorAll("[data-reveal]").forEach((target) => revealObserver.observe(target));
    }
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      revealObserver?.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio" id="top">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Ritsuki Ishikawa ホームへ">RITSUKI ISHIKAWA</a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span></button>
        <nav id="primary-navigation" className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="メインナビゲーション">
          <a href="#works" onClick={closeMenu}>WORKS <span>01</span></a>
          <a href="#about" onClick={closeMenu}>ABOUT <span>02</span></a>
          <a href="#background" onClick={closeMenu}>BACKGROUND <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>CONTACT <span>04</span></a>
        </nav>
        <span className="header-label">PORTFOLIO — 2026</span>
      </header>

      <main>
        <HeroTime />

        <section className="works section-wrap" id="works" aria-labelledby="works-title">
          <div className="works-effect" aria-hidden="true">
            {featuredNames.map((name) => (
              <div className={`works-effect-layer ${workOrder[0] === name ? "is-active" : ""}`} key={name} style={{ "--effect": `url(${asset(`img/effect/${workMeta[name].effect}`)})` }}>
                <span className="works-effect-half is-left" /><span className="works-effect-half is-right" />
              </div>
            ))}
          </div>
          <div className="section-heading" data-reveal><div><span className="section-kicker">01 / WORKS</span><h2 id="works-title">Selected <em>Works</em></h2></div></div>
          <div className="works-grid" id="works-grid">{workOrder.map((name) => allWorks.find((item) => item.name === name)).filter(Boolean).map((work, index) => <WorkCard key={work.name} work={work} index={index} featured={index === 0} compact={compact} onSelect={() => showWork(work.name)} />)}</div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="section-wrap about-inner">
            <div data-reveal><span className="section-kicker">02 / ABOUT ME</span><h2 id="about-title">About <em>Me</em></h2></div>
            <div className="about-body" data-reveal style={{ "--reveal-delay": "0.1s" }}><div className="about-identity"><img src={asset("img/myicon.png")} alt="Ritsuki Ishikawa" /><span>RITSUKI ISHIKAWA</span></div><p className="about-lead">機械学習の研究と、<br />Web UI の開発。</p><p>青山学院大学大学院で、深層学習モデルの予測不確実性の評価を研究しています。学部時代には IVRC で触覚を使った体験作品を制作し、そこから技術が人にどう伝わり、どう使われるかにも関心を持つようになりました。個人では Web アプリや UI の開発、手の動きで操作する作品などをつくっています。</p><a href="https://github.com/ritsuki-i" target="_blank" rel="noopener noreferrer" className="about-github"><Github size={17} /> GitHubプロフィールを見る <ArrowUpRight size={16} /></a><div className="about-facts"><div><span>NOW</span><strong>Machine Learning / Uncertainty Evaluation</strong></div><div><span>BUILD</span><strong>Web UI / Web Application Development</strong></div><div><span>BASED IN</span><strong>Japan</strong></div></div></div>
          </div>
          <AboutJourney />
        </section>

        <ContactSection />
      </main>

      <footer className="site-footer"><span>© {new Date().getFullYear()} RITSUKI ISHIKAWA</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  );
}
