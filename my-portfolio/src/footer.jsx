import React from 'react'
import "./footer.css"

export default function footer() {

    const OpenQR = () =>{
        const QRchecked = document.getElementById("sitelink");
        const qr = document.getElementById("qr");
        if(QRchecked.checked){
            qr.style.display = "block";
        }else{
            qr.style.display = "none";
        }
    };

  return (
    <div className="footer">
      <div className="sitelink">
        <label>
          <input
            type="checkbox"
            id="sitelink"
            className="sitelink-checkbox"
            onChange={OpenQR}
          />
          サイトのQRコードを表示
        </label>
        <div id="qr">
          <img src="img/QR.png" alt="ポートフォリオのQR" />
        </div>
      </div>
      <p>&copy; 2023 Ritsuki Ishikawa</p>
    </div>
  );
}
