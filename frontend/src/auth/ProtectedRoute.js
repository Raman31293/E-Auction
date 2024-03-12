import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ element, ...rest }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
}

