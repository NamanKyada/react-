import React, { Component } from 'react';
import './Game.css';

class CardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id, this.props.image);
    }
  }

  render() {
    let cardStyle = {};
    if (!this.props.imageUp) {
      cardStyle = {
        backgroundColor: 'white',
        width: '100px',
        height: '100px',
      };
    }

    const imPath = `${window.location.href}/images/${this.props.image}.jpg`;

    let className = 'Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
      <div className={className} style={cardStyle} onClick={this.onClick}>
        {this.props.imageUp && (
          <img src={`${imPath}`} alt='' style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    );
  }
}

export default CardView;
