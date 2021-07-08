import { utils } from '../utils/index.js';
import React from 'react';

export default class Home extends React.Component {
  render() {
    return <div className="home-container">
      <span>{utils.getFunctionName()}</span>
      <span>home container</span>
    </div>
  }
}