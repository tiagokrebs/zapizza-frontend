import axios from 'axios';

// Cria instancia axios para autenticacao
const instance = axios.create({
    baseURL: 'http://localhost:6543/'
});

export default instance;