import React, { Component } from 'react';

import classes from './Tamanho.module.css';
import PageTitle from '../../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Badge, Nav, Button } from 'react-bootstrap';
import ZappSpinner from '../../../components/UI/ZappSpinner/ZappSpinner';
import ModalB from '../../../components/UI/ModalB/ModalB';
import Aux from '../../../hoc/Aux/Aux';
import TamanhoForm from './TamanhoForm/TamanhoForm';
import * as actions from '../../../store/actions';

class Tamanho extends Component {
    state = {
        loading: false,
        modalShow: false,
        formAction: null, // insert/update/view
        formElementId: null,
        colunas: [
            {
                dataField: 'hash_id',
                text: 'hash_id',
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
                formatter: (cell, row, rowIndex) => {
                    if (row.ativo) {
                        return (
                            <div>
                                <i className="fas fa-edit" 
                                    style={{color: '#d4c3ba', margin: '0.5em'}} 
                                    onClick={() => this.modalFormUpdate(row)}
                                ></i>
                                <i className="fa fa-ban" 
                                    style={{color: '#d4c3ba', margin: '0.5em'}} 
                                    onClick={() => alert('desativar')}
                                ></i>
                            </div>
                        );
                    }
                    return (
                        <div>
                            <i className="fas fa-edit" 
                                style={{color: '#d4c3ba', margin: '0.5em'}} 
                                onClick={() => this.modalFormUpdate(row)}
                            ></i>
                            <i className="fas fa-check" 
                                style={{color: '#d4c3ba', margin: '0.5em'}} 
                                onClick={() => alert('ativar')}
                            ></i>
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

    modalFormInsert = () => {
        this.setState({ modalShow: true, formActionType: 'insert', formElementId: null });
    }

    modalFormUpdate = (row) => {
        this.setState({ modalShow: true, formActionType: 'update', formElementId: row.hash_id });
    }

    modalHandleClose = () => {
        this.setState({ modalShow: false });
    }

    modalHandleOk = () => {
        this.setState({ modalShow: false });
    }

    render () {
        let grid = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de tamanhos</h6>
                    <Nav className="pull-right">
                        <Nav.Item>
                            <Button variant="outline-light" size="sm" onClick={this.modalFormInsert}>
                                <i className="fa fa-plus"></i> 
                                <span> Novo</span>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </div>

                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <BootstrapTable 
                                keyField='hash_id'
                                data={this.props.tamanhos}
                                columns={this.state.colunas}
                                bootstrap4={true}
                                noDataIndication={'Nenhum resgistro encontrado :('}
                                bordered={false}
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

        let modalForm = (
            <ModalB className={classes.Modal}
                show={this.state.modalShow}
                title="Tamanho"
                handleClose={this.modalHandleClose}
            >
                <TamanhoForm 
                    modalClose={this.modalHandleClose}
                    formAction={this.state.formActionType}
                    elementId={this.state.formElementId}
                />
            </ModalB>
        );

        return (
            <Aux>
                {modalForm}
                {pageTitle}
                {pageContent}
            </Aux>
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