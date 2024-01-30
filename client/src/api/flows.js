import axios from './axios';

export const getFlowsRequest = () => axios.get('/flows');