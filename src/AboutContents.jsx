import React from 'react'
import "./AboutContents.css";
import AboutData from "./AboutData.json";

export default function AboutContents() {
  return (
    <div className="AboutContents">
      <div className="about">
        <h1 className="title">About</h1>
        <div className="name">
          <img src="img/myicon.png" className="myicon" alt="" />
          <div>
            <p>Ritsuki Ishikawa</p>
            <p>Aoyama Gakuin University</p>
          </div>
        </div>
      </div>
      {Object.keys(AboutData).map((category, c_index) => (
        <div className={category} key={c_index}>
          <h1 className="title">{category}</h1>
          <table className="about-table">
            <tr className="about-table-title">
              <td className="about-table-title-year">year</td>
              <td className="about-table-contents"></td>
            </tr>
            {AboutData[category].map((item, i_index) => (
              <tr
                className="about-table-line"
                key={"" + c_index + "-" + i_index}
              >
                <td className="about-table-title-year">{item.Year}</td>
                <td className="about-table-contents">{item.Content}</td>
              </tr>
            ))}
          </table>
        </div>
      ))}
    </div>
  );
}
