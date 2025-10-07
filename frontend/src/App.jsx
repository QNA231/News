import { Toaster } from 'sonner';
import { BrowserRouter, Router, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import NotFound from './pages/NotFound.jsx';
import Content from './pages/Content.jsx';
import Category from './pages/Category.jsx';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/category/:slug'
            element={<Category />}
          />
          <Route
            path='/content/:slug'
            element={<Content />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
