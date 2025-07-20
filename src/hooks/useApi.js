import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async (apiFunction, ...args) => {
        setLoading(true);
        setError(null);

        try {
            // Bind the function to apiService to maintain 'this' context
            const boundFunction = apiFunction.bind(apiService);
            const result = await boundFunction(...args);
            return result;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        callApi,
        clearError
    };
}; 