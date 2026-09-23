import React from "react";
import { ArrowUpRight } from "lucide-react";
import AboutData from "./Data/AboutData.json";
import "./AboutJourney.css";

const categories = [
  { key: "School", label: "学歴・研究", english: "EDUCATION" },
  { key: "Internship", label: "実務経験・インターンシップ", english: "EXPERIENCE" },
  { key: "Qualification", label: "資格", english: "QUALIFICATIONS" },
  { key: "Works", label: "受賞・発表", english: "RECOGNITION" },
  { key: "Hackathon", label: "ハッカソン", english: "HACKATHONS" },
];

export default function AboutJourney() {
  return (
    <div className="journey section-wrap" id="background" aria-labelledby="journey-title">
      <div className="journey-heading" data-reveal>
        <div>
          <span className="section-kicker">THE FULL STORY / これまでの歩み</span>
          <h3 id="journey-title">Background</h3>
        </div>
        <p>学び、研究、制作、現場での経験をまとめました。各項目を開くと詳しい内容を読めます。</p>
      </div>

      <nav className="journey-nav" aria-label="経歴のカテゴリー">
        {categories.map(({ key, label }) => (
          <a key={key} href={`#journey-${key.toLowerCase()}`}>
            {label}<ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </nav>

      <div className="journey-groups">
        {categories.map(({ key, label, english }, categoryIndex) => (
          <section className="journey-group" data-reveal id={`journey-${key.toLowerCase()}`} key={key} aria-labelledby={`journey-title-${key}`}>
            <div className="journey-group-heading">
              <span className="journey-number">{String(categoryIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}</span>
              <div>
                <span className="journey-english">{english}</span>
                <h4 id={`journey-title-${key}`}>{label}</h4>
              </div>
            </div>
            <div className="journey-items">
              {AboutData[key].map((item, index) => (
                <details className="journey-item" key={`${key}-${index}`}>
                  <summary>
                    <time className="journey-year">{item.Year}</time>
                    <span className="journey-item-title">{item.Content}</span>
                    <span className="journey-plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="journey-detail"><p>{item.detail}</p></div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
