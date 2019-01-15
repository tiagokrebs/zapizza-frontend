import axios from 'axios';

// Cria instancia axios para autenticacao
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:6543/' : 'http://warm-depths-40613.herokuapp.com/'
});

export default instance;