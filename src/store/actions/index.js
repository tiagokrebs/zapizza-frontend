export {
    register,
    confirm,
    setAuthRedirectPath,
    login,
    logout,
    loginCheck,
    forgot,
    reset
} from './auth';

export {
    setUserData,
    getProfile,
    postProfile,
} from './user';

export {
    getTamanhos,
    postTamanho,
    putTamanho,
    putTamanhoEnable,
    deleteTamanho
} from './tamanho';

export {
    getSabores,
    postSabor,
    putSabor,
    putSaborEnable,
    deleteSabor
} from './sabor';

export {
    getBordas,
    postBorda,
    putBorda,
    putBordaEnable,
    deleteBorda
} from './borda';

export {
    getAdicionais,
    postAdicional,
    putAdicional,
    putAdicionalEnable,
    deleteAdicional
} from './adicional';

export {
    getClientes,
    postCliente,
    putCliente,
    putClienteEnable,
    deleteCliente,
    pesquisaCep
} from './cliente';