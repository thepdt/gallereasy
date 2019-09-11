import React from 'react';
import ReactDOM from 'react-dom';
import Toolbars from './Toolbars';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Toolbars />, div);
  ReactDOM.unmountComponentAtNode(div);
});
