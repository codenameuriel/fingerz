import React from 'react';
import WPMSummaryStyles from './WPMSummary.module.css';

const WPMSummary = props => {
  const renderWordSummary = () => {
    const { wpmCounter } = props;
    const summary = [];

    for (let key in wpmCounter) {
      const score = parseInt(wpmCounter[key].toString().split('.')[0]);
      
      const scoreDisplay = (
        <div className={WPMSummaryStyles.WordWPM} key={key + score}>
          <p><span style={{color: 'white'}}>{`${key}`}</span>: {`${score}`}</p>
        </div>
      );
      
      summary.push(scoreDisplay);
    }

    return summary;
  };

  const getTotal = obj => {
    let total = 0;

    for (let key in obj) {
      total += obj[key];
    }

    return total;
  };

  const renderAverageWPM = () => {
    const { wpmCounter } = props;
    const total = getTotal(wpmCounter);

    const averageWPM = 
      Math.floor(parseFloat((total / Object.keys(wpmCounter).length).toFixed(2)));

    return <p>{averageWPM}</p>; 
  };

  const sort = (arr1, arr2) => {
    return arr1[1] - arr2[1];
  };

  const slowestWPMWords = () => {
    const { wpmCounter } = props;
    const wpmScores = [];
    const slowestWords = [];
   
    for (let key in wpmCounter) {
      wpmScores.push([key, wpmCounter[key]]);
    }

    const slowestWPMScores = wpmScores.sort(sort).slice(0, 9);

    for (let i = 0; i < slowestWPMScores.length; i++) {
      let word = slowestWPMScores[i][0];
      slowestWords.push(word);
    }

    return slowestWords;
  };

  const renderSlowestWPMWords = arr => {
    const summary = [];

    for (let i = 0; i < arr.length; i++) {
      const wordDisplay = (
        <div className={WPMSummaryStyles.SlowWord}>
          <p>{arr[i]}</p>
        </div>
      );

      summary.push(wordDisplay);
    }
  
    return summary;
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

      <div className={WPMSummaryStyles.SlowestWordsContainer}>
        <h1>Slowest Words</h1>
        <div className={WPMSummaryStyles.SlowestWordsList}>
          {renderSlowestWPMWords(slowestWPMWords())}
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
