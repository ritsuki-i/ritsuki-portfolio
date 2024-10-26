import React, { useEffect, useState } from "react";
import "./AppCard.css";
import AppData from "./Data/AppData.json";
import CloseIcon from '@mui/icons-material/Close';

export default function AppCard() {
  const [shuffledApps, setShuffledApps] = useState([]);
  const [shuffledSystems, setShuffledSystems] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

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
        
        if(size*2 < 19.5){
          AppName[i].style.fontSize = size * 2 + "px";
        }else{
          AppName[i].style.fontSize =  "19.5px";
        }
      }
    } else {
      const AppName = document.querySelectorAll(".app-name");
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
  }, []);

  const handleDetailClick = (app) => {
    setSelectedApp(app);
  };

  const closePopup = () => {
    setSelectedApp(null);
  };

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
                  <button className="detail-btn" onClick={() => handleDetailClick(app)}>Detail</button>
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
                  <button className="detail-btn" onClick={() => handleDetailClick(system)}>Detail</button>
                  {system.url ? (
                    <a href={system.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button className="selected-app-play-btn">Play</button>
                    </a>
                  ) : (
                    <a href={system.githuburl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button className="selected-app-play-btn">Play</button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedApp && (
        <div className="app-popup">
          <div className="popup-content">
            <h2>{selectedApp.name}</h2>
            <p>{selectedApp.script}</p>
            <p>
              <span style={{ float: 'left', fontWeight: 'bold' }}>開発経緯:</span>
              <span style={{ display: 'block', marginLeft: '80px' }}>{selectedApp.background}</span>
            </p>
            <p>
              <span style={{ float: 'left', fontWeight: 'bold' }}>使用技術:</span>
              <span style={{ display: 'block', marginLeft: '80px' }}>
                {selectedApp.technology.split(" ").map((tec, index) => (
                  <span key={index} style={{ backgroundColor: 'rgba(116, 116, 116, 0.407)', margin: '0 5px', borderRadius: '40%', padding: '5px', display: 'inline-block' }}>{tec}</span>
                ))}
              </span>
            </p>
            <button className="close-btn" onClick={closePopup}><CloseIcon /></button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {selectedApp.githuburl ? (
                <a href={selectedApp.githuburl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="selected-app-play-btn" style={{ display: 'block', margin: 'auto', marginRight: '50px' }}>GitHub</button>
                </a>
              ) : null}
              {selectedApp.url ? (
                <a href={selectedApp.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button className="selected-app-play-btn" style={{ display: 'block', margin: 'auto' }}>Play</button>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
