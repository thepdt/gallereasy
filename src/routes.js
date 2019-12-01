import React from 'react';

const Search = React.lazy(() => import('./views/Search/Search'));
const Favourites = React.lazy(() => import('./views/Favourites/Favourites'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Search },
    { path: '/favourites', exact: true, name: 'Favourites', component: Favourites },
];

export default routes;
