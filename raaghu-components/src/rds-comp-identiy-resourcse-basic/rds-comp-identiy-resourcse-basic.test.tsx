import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompIdentiyResourcseBasic from './RdsCompIdentiyResourcseBasic';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompIdentiyResourcseBasic />, div);
  ReactDOM.unmountComponentAtNode(div);
});