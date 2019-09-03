import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Network from './Network';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Network /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 