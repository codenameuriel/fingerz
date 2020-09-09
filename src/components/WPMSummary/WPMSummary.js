import React from 'react';
import WPMSummaryStyles from './WPMSummary.module.css';

const WPMSummary = props => {
  console.log(props.wpmCounter);
  
  const renderWordSummary = () => {
    const summary = [];

    for (let key in props.wpmCounter) {
      const score = parseInt(props.wpmCounter[key].toString().split('.')[0]);
      
      const scoreDisplay = (
        <div className={WPMSummaryStyles.WordWPM}>
          <p>{`${key}:   ${score}`}</p>
        </div>
      );
      
      summary.push(scoreDisplay);
    }

    return summary;
  };

  const renderAverageWPM = () => {
    let total = 0;

    for (let key in props.wpmCounter) {
      total += props.wpmCounter[key];
    }

    const averageWPM = Math.floor(parseFloat((total / Object.keys(props.wpmCounter).length).toFixed(2)));

    return <p>{averageWPM}</p>; 
  };
  
  return (
    <div className={WPMSummaryStyles.WPMSummary}>
      <div className={WPMSummaryStyles.Review}>
        <div>
          <h1>WPM Per Word</h1> 
        </div>
        <div className={WPMSummaryStyles.WordSummary}>
          {renderWordSummary()}
        </div>
      </div> 

      <div className={WPMSummaryStyles.Average}>
        <div className={WPMSummaryStyles.ScoreHeader}>
          <h1>Average WPM</h1>
        </div>
        <div className={WPMSummaryStyles.Score}>
          {renderAverageWPM()}
        </div>
      </div>
    </div>
  );
}

export default WPMSummary;
