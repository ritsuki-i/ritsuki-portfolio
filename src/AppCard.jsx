import React, { useEffect, useState } from "react";
import "./AppCard.css";
import AppData from "./Data/AppData.json";

export default function AppCard() {
  const [shuffledApps, setShuffledApps] = useState([]);
  const [shuffledSystems, setShuffledSystems] = useState([]);

  // 配列をシャッフルする関数
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // 配列が空になるまでシャッフルを続ける
    while (currentIndex !== 0) {
      // 残っている要素をランダムに取得
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // そしてそれを現在の要素と交換する
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  // adjustFontSize関数を定義  
  const adjustFontSize = () => {
    if (window.innerWidth <= 960) {
      const AppName = document.querySelectorAll(".app-name");
      const appimg = document.querySelectorAll(".appimg");

      for (let i = 0; i < AppName.length; i++) {
        //アプリ名を取得
        const textContent = AppName[i].textContent;

        // 半角文字の数を取得 (大文字を除外)
        const halfWidthCount = (textContent.match(/[ -~]/g) || []).length - (textContent.match(/[A-Z]/g) || []).length;
        // 全角文字の数を取得（英語の大文字を全角として扱う）
        const fullWidthCount = (textContent.match(/[^\x00-\x7F]/g) || []).length + (textContent.match(/[A-Z]/g) || []).length;

        //半角文字列基準にとしたときの文字数
        const textWidthCount = halfWidthCount + fullWidthCount * 2;

        const size = (AppName[i].offsetWidth - appimg[i].offsetWidth - 20) / textWidthCount;
        AppName[i].style.fontSize = size * 2 + "px";
      }
    } else {
      const AppName = document.querySelectorAll(".long");
      for (let i = 0; i < AppName.length; i++) {
        const size = 3;
        AppName[i].style.fontSize = size + "vh";
      }
    }
  };


  useEffect(() => {
    setShuffledApps(shuffleArray([...AppData.apps]));
    setShuffledSystems(shuffleArray([...AppData.systems]));
  
    // ページ読み込み時に実行
    setTimeout(() => {
      adjustFontSize();
    }, 0);

    
    // ウィンドウのサイズ変更時にも実行
    window.addEventListener("resize", adjustFontSize);

    // コンポーネントのアンマウント時にイベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  },[]);
  return (
    <div className="AppCard">
      <h1 className="title">Application</h1>
      <div className="row g-4 mt-3">
        {shuffledApps.map((app) => (
          <div className="col-sm-4" key={app.name}>
              <div className="app-card">
                <div className="my-4">
                  <img src={app.path} className="appimg" alt="" />
                  <h5 className="app-name">{app.name}</h5>
                  <p>{app.script}</p>
                  <div className="app-card-button">
                    <button className="detail-btn">Detail</button>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <button className="play-btn">Play</button>
                    </a>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
      <h1 className="title">System</h1>
      <div className="row g-4 mt-3">
        {shuffledSystems.map((system) => (
          <div className="col-sm-4" key={system.name}>
              <div className="app-card">
                <div className="my-4">
                  <img src={system.path} className="appimg" alt="" />
                  <h5 className="app-name">{system.name}</h5>
                  <p>{system.script}</p>
                  <div className="app-card-button">
                    <button className="detail-btn">Detail</button>
                    <a href={system.url} target="_blank" rel="noopener noreferrer">
                      <button className="play-btn">Play</button>
                    </a>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
