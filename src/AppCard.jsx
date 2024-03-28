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
      const playbtn = document.querySelectorAll(".long");
      const appimg = document.querySelectorAll(".appimg");
      for (let i = 0; i < playbtn.length; i++) {
        const size =
          (playbtn[i].offsetWidth - appimg[i].offsetWidth - 20) /
          playbtn[i].textContent.length;
        playbtn[i].style.fontSize = size + "px";
      }
    } else {
      const playbtn = document.querySelectorAll(".long");
      for (let i = 0; i < playbtn.length; i++) {
        const size = 3;
        playbtn[i].style.fontSize = size + "vh";
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
            <a href={app.url} target="_blank" rel="noopener noreferrer">
              <div className="app-card">
                <div className="my-4">
                  <img src={app.path} className="appimg" alt="" />
                  <h5 className="long">{app.name}</h5>
                  <p>{app.script}</p>
                  <button className="play-btn">Play</button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <h1 className="title">System</h1>
      <div className="row g-4 mt-3">
        {shuffledSystems.map((system) => (
          <div className="col-sm-4" key={system.name}>
            <a href={system.url} target="_blank" rel="noopener noreferrer">
              <div className="app-card">
                <div className="my-4">
                  <img src={system.path} className="appimg" alt="" />
                  <h5 className="long">{system.name}</h5>
                  <p>{system.script}</p>
                  <button className="play-btn">Play</button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
