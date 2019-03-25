
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Posts from './Posts';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Posts /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 