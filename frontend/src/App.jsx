import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import NotFound from './pages/NotFound.jsx';

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
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
