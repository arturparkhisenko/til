import React from 'react';

const ButtonFunctional = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
);

export default ButtonFunctional;
