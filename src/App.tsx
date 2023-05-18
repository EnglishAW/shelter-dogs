import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/login-page';
import SearchPage from './pages/search-page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/header/header';
import MatchedPage from './pages/matched-page';
import WelcomePage from './pages/welcome-page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/match",
    element: <MatchedPage />,
  },
]);

function App() {

  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
