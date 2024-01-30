import axios from './axios';

export const getTransactionsRequest = () => axios.get('/transactions');

export const getTransactionRequest = (id) => axios.get(`/transactions/${id}`);

export const createTransactionRequest = (transaction) => axios.post('/transactions', transaction);

export const updateTransactionRequest = (id, transaction) => axios.put(`/transactions/${id}`, transaction);

export const deleteTransactionRequest = (id) => axios.delete(`/transactions/${id}`);