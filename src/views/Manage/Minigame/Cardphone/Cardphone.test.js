import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Cardphone from './Cardphone';
  
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Cardphone/></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
}); 