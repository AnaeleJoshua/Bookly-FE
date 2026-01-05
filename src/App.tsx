import LoginButton from './components/Auth/LoginButton'
import AllBooksPage from './components/AdminPanel/Books/books.pages';
import Profile from './components/Profile/Profile'
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { Routes, Route} from 'react-router-dom';
import CreateBookForm from  './components/AdminPanel/CreateBookForm'
import { Toaster } from "react-hot-toast";
import UpdateBookForm from './components/AdminPanel/UpdateBookForm';

function App() {
  
 const { isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
          <div className="app-container">
            <div className="error-state">
              <div className="error-title">Oops!</div>
              <div className="error-message">Something went wrong</div>
              <div className="error-sub-message">{error.message}</div>
            </div>
          </div>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/books" element={<AllBooksPage />} />
          </Routes>
        </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
      <Route path="/books" element={
        <ProtectedRoute>
          <AllBooksPage />
        </ProtectedRoute>
      } />
      <Route path="/" element={
        <div className="app-container">
          <div className="main-card-wrapper">
            <img 
              src="./components/assets/bookly.png" 
              alt="Auth0 Logo" 
              className="auth0-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="main-title">Welcome to Bookly</h1>
            
            {isAuthenticated ? (
              <div className="logged-in-section">
                <div className="profile-card">
                  <ProtectedRoute>
                    <AdminPanel />
                    <Profile />
                  </ProtectedRoute>
                </div>
                
              </div>
            ) : (
              <div className="action-card">
                <p className="action-text">Get started by signing in to your account</p>
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      } />
      <Route path="/create-book" element={
        <ProtectedRoute>
          <CreateBookForm />
        </ProtectedRoute>
      } />
       <Route path="/update-book/:id" element={
        <ProtectedRoute>
          <UpdateBookForm />
        </ProtectedRoute>
      } />
    </Routes>
    </>
      )
}

export default App
