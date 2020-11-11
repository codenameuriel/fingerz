import React from 'react';
import WPMSummaryStyles from './WPMSummary.module.css';
import Button from '../UI/Button/Button';

const WPMSummary = props => {
  const renderWordSummary = () => {
    const { wpmCounter } = props;
    const summary = [];

    for (let key in wpmCounter) {
      const score = parseInt(wpmCounter[key].toString().split('.')[0]);
      
      const scoreDisplay = (
        <div className={WPMSummaryStyles.WordWPM} key={key + score}>
          <p><span style={{color: 'white'}}>{`${key}`}:</span> {`${score}`}</p>
        </div>
      );
      
      summary.push(scoreDisplay);
    }

    return summary;
  };

  const renderAccScore = () => {
    const { typedChars, typoCount } = props;

    const correctlyTypedChars = typedChars - typoCount;
    const accuracy = (correctlyTypedChars / typedChars) * 100;
    const accScore = Math.floor(accuracy);

    return <p><span style={{color: '#00c4c4'}}>{accScore}</span>%</p>;
  };

  const renderAverageWPM = () => {
    const { typedChars, typoCount } = props;
    const grossWPM = Math.ceil((typedChars / 5) / 1);
    const netWPM = grossWPM - typoCount;

    return <p>{netWPM}</p>; 
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
        <div key={arr[i]} className={WPMSummaryStyles.SlowWord}>
          <p>{arr[i]}</p>
        </div>
      );

      summary.push(wordDisplay);
    }
  
    return summary;
  };

  return (
    <div className={WPMSummaryStyles.WPMSummaryContainer}>
      <div className={WPMSummaryStyles.WPMSummary}>
        <div className={WPMSummaryStyles.Review}>
          <h1>WPM Per Word</h1>
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

        <div className={WPMSummaryStyles.StatsContainer}>
          <div className={WPMSummaryStyles.AccAvgContainer}>
            <div className={WPMSummaryStyles.Accuracy}>
              <h1>Accuracy</h1>
              <div className={WPMSummaryStyles.AccScore}>
                {renderAccScore()}
              </div>
            </div>

            <div className={WPMSummaryStyles.Average}>
              <h1>WPM</h1>
              <div className={WPMSummaryStyles.Score}>
                {renderAverageWPM()}
              </div>
            </div>
          </div>

          <Button
            text="Restart" 
            handleClick={props.onRestartTest}/>
        </div>
      </div>
    </div>
  );
}

export default WPMSummary;
