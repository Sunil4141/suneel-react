import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompBlogPostNew from './RdsCompBlogPostNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompBlogPostNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});