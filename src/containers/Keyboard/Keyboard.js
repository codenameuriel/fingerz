import React, { Component } from 'react';
import KeyboardStyles from './Keyboard.module.css';
import { connect } from 'react-redux';

const TOPROWKEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const MIDROWKEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const BOTTOMROWKEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.createKeyRefs()
  }

  createKeyRefs() {
    const keys = [...TOPROWKEYS, ...MIDROWKEYS, ...BOTTOMROWKEYS, 'space'];
    return keys.map(key => this[`${key}Key`] = React.createRef());
  }

  createKeyDivs(section) {
    switch(section) {
      case 'top':
        return (
          TOPROWKEYS.map((key, index) => (
          <div key={`${key} ${index}`} className={KeyboardStyles.key}>

            <div 
              id={key} 
              ref={this[`${key}Key`]} 
              style={this.setStyle(this[`${key}Key`])}>{key}</div>
          </div>
        )));
      case 'mid':
        return (
          MIDROWKEYS.map((key, index) => (
            <div key={`${key} ${index}`} className={KeyboardStyles.key}>
              <div 
                id={key} 
                ref={this[`${key}Key`]} 
                style={this.setStyle(this[`${key}Key`])}>{key}</div>
            </div>
          )));
        case 'bottom':
          return (
            BOTTOMROWKEYS.map((key, index) => (
              <div key={`${key} ${index}`} className={KeyboardStyles.key}>
                <div 
                  id={key} 
                  ref={this[`${key}Key`]} 
                  style={this.setStyle(this[`${key}Key`])}>{key}</div>
              </div>
            )));
        case 'space':
          return (
            <div className={KeyboardStyles.spaceKey}>
                <div 
                  id="space"
                  ref={this.spaceKey} 
                  style={this.setStyle(this.spaceKey)}>space</div>
              </div>
          );
      default: return null;
    }
  }

  setStyle(key) {
    if (key.current) {
      if (this.props.pressedKey.value === key.current.id ) {
        return this.props.pressedKey.style;
      }

      if (this.props.pressedKey.value === ' ' && key.current.id === 'space') {
        return this.props.pressedKey.style;
      }

      else return null;
    }
  }

  render() {
    return (
      <div className={KeyboardStyles.Keyboard}>
        <div className={KeyboardStyles.TopRow}>
            {this.createKeyDivs('top')}
          </div>

          <div className={KeyboardStyles.MidRow}>
            {this.createKeyDivs('mid')}
          </div>

          <div className={KeyboardStyles.BottomRow}>
            {this.createKeyDivs('bottom')}
          </div>

          <div className={KeyboardStyles.Space}>
            {this.createKeyDivs('space')}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pressedKey: state.wordPanel.pressedKey
  };
};

export default connect(mapStateToProps)(Keyboard);
