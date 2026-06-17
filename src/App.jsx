import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from './components/RequireAuth';
import Header from "./shared/Header.jsx";

function App() { 
  return (
    <div className="min-h-screen  text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
<Routes>
      <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/todos'
          element={
            <RequireAuth>
              <TodosPage />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </main>
    </div>
  );
}
export default App;
