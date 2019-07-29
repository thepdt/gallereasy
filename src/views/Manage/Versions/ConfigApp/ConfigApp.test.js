import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ConfigApp from './ConfigApp';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ConfigApp /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 