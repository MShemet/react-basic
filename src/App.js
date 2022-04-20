import { StrictMode, useState } from 'react';
// import { StrictMode, useState, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ThemeContext from './ThemeContext';
import Details from './Details';
import SearchParams from './SearchParams';

// const Details = lazy(() => import('./Details')); // lazy not support for ssr
// const SearchParams = lazy(() => import('./SearchParams')); // lazy not support for ssr

const App = () => {
  const theme = useState('darkBlue');

  return (
    <StrictMode>
      {/* <Suspense fallback={<h2>loading, be patient</h2>}> */}
      <ThemeContext.Provider value={theme}>
        <div
          className="p-0 m-0"
          style={{
            background:
              'url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg)',
          }}
        >
          {/* <BrowserRouter> */}
          <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link to="/" className="text-6xl text-white hover:text-gray-200">
              Adopt me!
            </Link>
          </header>

          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
          {/* </BrowserRouter> */}
        </div>
      </ThemeContext.Provider>
      {/* </Suspense> */}
    </StrictMode>
  );
};

export default App;
