import axios from './axios';

export const getCardsRequest = () => axios.get('/cards');

export const getCardRequest = (id) => axios.get(`/cards/${id}`);

export const createCardRequest = (card) => axios.post('/cards', card);

export const updateCardRequest = (id, card) => axios.put(`/cards/${id}`, card);

export const deleteCardRequest = (id) => axios.delete(`/cards/${id}`);