
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import HotTrends from './HotTrends';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><HotTrends /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 