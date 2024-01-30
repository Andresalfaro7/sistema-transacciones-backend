import axios from './axios';

export const getTransfersRequest = () => axios.get('/transfers');

export const getTransferRequest = (id) => axios.get(`/transfers/${id}`);

export const createTransferRequest = (transfer) => axios.post('/transfers', transfer);

export const updateTransferRequest = (id, transfer) => axios.put(`/transfers/${id}`, transfer);

export const deleteTransferRequest = (id) => axios.delete(`/transfers/${id}`);