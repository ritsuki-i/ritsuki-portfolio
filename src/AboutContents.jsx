import React, { useState } from "react";
import "./AboutContents.css";
import AboutData from "./Data/AboutData.json";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
export default function AboutContents() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleRowClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

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
        <div className={category} key={`${category}-${c_index}`}>
          <h1 className="title">{category}</h1>
          <table className="about-table">
            <tbody>
              <tr className="about-table-title">
                <td></td>
                <td className="about-table-year">year</td>
                <td className="about-table-contents"></td>
              </tr>
              {AboutData[category].map((item, i_index) => (
                <React.Fragment key={`${category}-${i_index}`}>
                  <tr className={`about-table-line ${selectedIndex === `${category}-${i_index}` ? "selected" : ""}`} onClick={() => handleRowClick(`${category}-${i_index}`)} >
                    <td className="about-table-expand" style={{ textAlign: 'center' }}>
                      {selectedIndex === `${category}-${i_index}` ? (
                        <ExpandLessIcon sx={{
                          fontSize: {
                            xs: 'small', // 960px以下の時
                            md: 'large', // 960px以上の時
                          }
                        }} />
                      ) : (
                        <ExpandMoreIcon sx={{
                          fontSize: {
                            xs: 'small', // 960px以下の時
                            md: 'large', // 960px以上の時
                          }
                        }} />
                      )}
                    </td>

                    <td className="about-table-year">{item.Year}</td>
                    <td className="about-table-contents">{item.Content}</td>
                  </tr>
                  {selectedIndex === `${category}-${i_index}` && (
                    <tr className="detail-row">
                      <td colSpan="3">
                        <div className="details">
                          <p>{item.detail}</p>
                        </div>
                      </td>
                    </tr>)}
                </React.Fragment>)
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
