import React, { Component } from 'react';

import classes from './Tamanho.module.css';
import PageTitle from '../../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Badge } from 'react-bootstrap';
import ZappSpinner from '../../../components/UI/ZappSpinner/ZappSpinner';
import * as actions from '../../../store/actions';

class Tamanho extends Component {
    state = {
        colunas: [
            {
                dataField: 'id',
                text: 'id',
                hidden: true
            },
            {
                dataField: 'descricao',
                text: 'Descrição',
                sort: true,
            }, 
            {
                dataField: 'quantSabores',
                text: 'Sabores',
                align: 'center',
                sort: true
            }, 
            {
                dataField: 'quantBordas',
                text: 'Bordas',
                align: 'center',
                sort: true
            },
            {
                dataField: 'quantFatias',
                text: 'Fatias',
                align: 'center',
                sort: true
            },
            {
                dataField: 'botoes',
                text: '',
                idDumyfield: true,
                align: 'center',
                formatter: (cellContent, row) => {
                    if (row.ativo) {
                        return (
                            <div>
                                <i className="fas fa-edit" style={{color: '#d4c3ba'}} onClick={() => alert('editar')}></i>
                                <i className="fa fa-ban" style={{color: '#d4c3ba'}} onClick={() => alert('desativar')}></i>
                            </div>
                        );
                    }
                    return (
                        <div>
                            <i className="fas fa-edit" style={{color: '#d4c3ba'}} onClick={() => alert('editar')}></i>
                            <i className="fas fa-check" style={{color: '#d4c3ba'}} onClick={() => alert('ativar')}></i>
                        </div>
                    );
                }
            },
            {
                dataField: 'enable',
                isDummyField: true,
                text: '',
                align: 'center',
                formatter: (cellContent, row) => {
                    if (row.ativo) {
                        return <Badge variant="success">Ativo</Badge>
                    }
                    return <Badge variant="danger">Inativo</Badge>
                }
            }

        ]
    }

    componentDidMount () {
        this.props.onGetTamanhos();
    }

    render () {
        let grid = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de tamanhos</h6>
                </div>

                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <BootstrapTable keyField='id' 
                                data={this.props.tamanhos}
                                columns={this.state.colunas}
                                bootstrap4={true}
                                noDataIndication={'Nenhum resgistro encontrado :('}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );

        if (this.props.pending) {
            grid = <ZappSpinner />
        }

        let pageTitle = <PageTitle title={'Tamanhos'} subtitle='Informe os seus tamanhos'/>

        if (!this.props.isAuthenticated) {
            pageTitle = null;
        }

        
        let pageContent = (
            <div className="row">
                <div className="col-sm-12">
                    <div className={`card ${classes.Card}`}>
                        {/* {message} */}
                        {grid}
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {pageTitle}
                {pageContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pending: state.pizza.tamanho.api.pending,
        error: state.pizza.tamanho.api.error,
        tamanhos: state.pizza.tamanho.tamanhos
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTamanhos: () => dispatch(actions.getTamanhos())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tamanho);