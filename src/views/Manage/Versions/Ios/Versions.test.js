import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Versions from './Versions';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Versions /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 