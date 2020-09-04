import React from 'react';

const WordList = props => {
  const showWord = (index) => {
    const words = ['queen', 'spiritual', 'twin', 'incense', 'bowl', 'singing', 'noisy', 'sound', 'painting', 'organic'];

    if (index === words.length) props.disableInput();

    return words[index];
  }

  return (
    <div>
     <h1 
          style={{marginBottom: '-20px'}}>{showWord(props.index)}
        </h1>

        <h5>
          (Press <span style={{color: 'rgb(231, 231, 149)'}}>SPACE</span> for next word)
        </h5> 
    </div>
  );
}

export default WordList;
