import React from 'react';

import classes from './Loader.module.scss';

const Loader = props => (
  <div className = {classes.Loader}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className = {classes.svg} width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(26.833333333333332,26.833333333333332)">
        <rect x="-19.5" y="-19.5" width="39" height="39" fill="#e15b64">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="0.78125s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.234375s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(73.16666666666667,26.833333333333332)">
        <rect x="-19.5" y="-19.5" width="39" height="39" fill="#f47e60">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="0.78125s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.15625s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(26.833333333333332,73.16666666666667)">
        <rect x="-19.5" y="-19.5" width="39" height="39" fill="#f8b26a">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="0.78125s" keyTimes="0;1" values="1.1500000000000001;1" begin="0s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(73.16666666666667,73.16666666666667)">
        <rect x="-19.5" y="-19.5" width="39" height="39" fill="#abbd81">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="0.78125s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.078125s"></animateTransform>
        </rect>
      </g>
      </svg>
  </div>


)

export default Loader;