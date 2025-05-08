import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com'; // Example API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const getAllIndicators = async () => {
  try {
    const response = await axios.get('https://mindicador.cl/api');
    return response.data;
  } catch (error) {
    console.error('Error fetching indicators:', error);
    throw error;
  }
};

export const getIndicatorValue = async (indicator = 'dolar') => {
  try {
    const response = await axios.get('https://mindicador.cl/api');
    return response.data[indicator];
  } catch (error) {
    console.error(`Error fetching ${indicator} value:`, error);
    throw error;
  }
};

export const getDollarValue = async () => {
  try {
    const response = await axios.get('https://mindicador.cl/api');
    return response.data.dolar;
  } catch (error) {
    console.error('Error fetching dollar value:', error);
    throw error;
  }
};

export const getHistoricalIndicatorValue = async (indicator = 'dolar', date) => {
  try {
    // Format should be dd-mm-yyyy
    const formattedDate = date.split('-').reverse().join('-');
    const response = await axios.get(`https://mindicador.cl/api/${indicator}/${formattedDate}`);
    return response.data.serie[0];
  } catch (error) {
    console.error(`Error fetching historical ${indicator} value:`, error);
    throw error;
  }
};

export const getHistoricalDollarValue = async (date) => {
  try {
    // Format should be dd-mm-yyyy
    const formattedDate = date.split('-').reverse().join('-');
    const response = await axios.get(`https://mindicador.cl/api/dolar/${formattedDate}`);
    return response.data.serie[0];
  } catch (error) {
    console.error('Error fetching historical dollar value:', error);
    throw error;
  }
};

export const getIndicatorSeries = async (indicator = 'dolar') => {
  try {
    const response = await axios.get(`https://mindicador.cl/api/${indicator}`);
    // Get last 30 values and reverse to show chronologically (oldest to newest)
    return response.data.serie.slice(0, 30).reverse();
  } catch (error) {
    console.error(`Error fetching ${indicator} series:`, error);
    throw error;
  }
};

export const getDollarSeries = async () => {
  try {
    const response = await axios.get('https://mindicador.cl/api/dolar');
    // Get last 30 values and reverse to show chronologically (oldest to newest)
    return response.data.serie.slice(0, 30).reverse();
  } catch (error) {
    console.error('Error fetching dollar series:', error);
    throw error;
  }
};

export const getIndicatorByYear = async (indicator = 'dolar', year) => {
  try {
    const response = await axios.get(`https://mindicador.cl/api/${indicator}/${year}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${indicator} for year ${year}:`, error);
    throw error;
  }
};

export const getDollarLast30Days = async () => {
  try {
    const response = await axios.get('https://mindicador.cl/api/dolar');
    // Get last 30 values
    return response.data.serie.slice(0, 30);
  } catch (error) {
    console.error('Error fetching dollar last 30 days:', error);
    throw error;
  }
};

export default api; 