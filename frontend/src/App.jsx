import { BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <BrowserRouter
                  future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                  }}
                >
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin/*"
                            element={
                                <PrivateRoute>
                                    <AdminLayout />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;