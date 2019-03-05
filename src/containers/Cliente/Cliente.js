import React, { Component } from 'react';

import classes from './Cliente.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import ZappSpinner from '../../components/ZappSpinner/ZappSpinner';
import RowActions from '../../components/DataTable/RowActions/RowActions';
import { Badge, Nav, Button } from 'react-bootstrap';
import DataTableB from '../../components/UI/DataTableB/DataTableB';
import PageTitle from '../../components/Page/PageTitle/PageTitle';
import ModalB from '../../components/UI/ModalB/ModalB';
import DeleteForm from '../../components/DeleteForm/DeleteForm';
import Aux from '../../hoc/Aux/Aux';

class Cliente extends Component {
    state = {
        loading: false,
        modalShow: false,
        formActionType: null,
        formElementId: null,
        formElementDescricao: null,
        page: 1,
        pageSize: 10,
        sortField: 'nome',
        sortOrder: 'asc'
    }

    componentDidMount () {
        this.props.onGetClientes(this.state.page-1, this.state.pageSize, this.state.sortField, this.state.sortOrder);
    }

    modalFormInsert = () => {
        this.setState({ modalShow: true, formActionType: 'insert', formElementId: null });
    }

    modalFormUpdate = (row) => {
        this.setState({ modalShow: true, formActionType: 'update', formElementId: row.hash_id });
    }

    modalFormDelete = (row) => {
        this.setState({ modalShow: true, formActionType: 'delete', formElementId: row.hash_id, formElementDescricao: row.nome });
    }

    modalHandleClose = () => {
        this.setState({ modalShow: false });
    }

    modalHandleDelete = (event) => {
        event.preventDefault()
        this.props.onDeleteCliente(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const clienteData = {
            ativo: !row.ativo
        }
        this.props.onPutClienteEnable(row.hash_id, clienteData);
    }


    handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
        const currentIndex = (page - 1) * sizePerPage;
        // handle paginação
        if (type === 'pagination') {
            this.props.onGetClientes(currentIndex, sizePerPage, sortField, sortOrder);
            this.setState(() => ({
                page: page,
                pageSize: sizePerPage
            }));
        }

        // handle ordenação
        if (type === 'sort') {
            this.props.onGetClientes(currentIndex, sizePerPage, sortField, sortOrder);
            this.setState(() => ({
                sortField: sortField,
                sortOrder: sortOrder
            }));
        }
      }

    render () {
        let spinner;
        if (this.props.pending) {
            spinner = <ZappSpinner />
        }

        const colunas = [
            {
                dataField: 'hash_id',
                text: 'hash_id',
                hidden: true
            },
            {
                dataField: 'nome',
                text: 'Nome',
                sort: true,
            },
            {
                dataField: 'botoes',
                isDummyField: true,
                text: '',
                align: 'center',
                formatter: (cellContent, row) => {
                    return <RowActions
                        row={row}
                        modalFormUpdate={this.modalFormUpdate}
                        submitEnableHandler={this.submitEnableHandler}
                        modalFormDelete={this.modalFormDelete}
                        />
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

        let grid = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de clientes</h6>
                    {/* <Nav className="pull-right">
                        <Nav.Item>
                            <Button variant="outline-light" size="sm" onClick={this.modalFormInsert}>
                                <i className="fa fa-plus"></i> 
                                <span> Novo</span>
                            </Button>
                        </Nav.Item>
                    </Nav> */}
                </div>
                <div className={`card-block ${classes.CardBlock}`}>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <DataTableB
                                remote
                                keyField='hash_id'
                                data={this.props.clientes}
                                columns={colunas}
                                page={this.state.page}
                                sizePerPage={this.state.pageSize}
                                totalSize={this.props.totalItems}
                                onTableChange={this.handleTableChange}
                            />
                        </div>
                    </div>
                </div>
                {spinner}
            </div>
        );

        let pageTitle = <PageTitle title={'Tamanhos'} subtitle='Informe os seus clientes'/>

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
                size='lg'
                show={this.state.modalShow && this.state.formActionType !== 'delete'}
                title="Cliente"
                handleClose={this.modalHandleClose}
            >
                {/* <TamanhoForm 
                    modalClose={this.modalHandleClose}
                    formAction={this.state.formActionType}
                    elementId={this.state.formElementId}
                /> */}
                <h2>Modal do cliente</h2>
            </ModalB>
        );

        let modalFormDelete = (
            <ModalB className={classes.Modal}
                size='md'
                title='Você tem certeza?'
                show={this.state.modalShow && this.state.formActionType === 'delete'}
                handleClose={this.modalHandleClose}
            >
                <DeleteForm 
                    deleteConfirm={this.modalHandleDelete}
                    elementDesc={this.state.formElementDescricao}
                />
            </ModalB>
        );

        return (
            <Aux>
                {modalForm}
                {modalFormDelete}
                {pageTitle}
                {pageContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pending: state.cliente.cliente.api.pending,
        error: state.cliente.cliente.api.error,
        clientes: state.cliente.cliente.clientes,
        totalItems: state.cliente.cliente.totalItems
    };
};

const mapDisptachToProps = dispatch => {
    return {
        onGetClientes: (start, pageSize, sortField, sortOrder) => dispatch(actions.getClientes(start, pageSize, sortField, sortOrder)),
        onPutClienteEnable: (clienteId, ClienteData) => dispatch(actions.putClienteEnable(clienteId, ClienteData)),
        onDeleteCliente: (clienteId) => dispatch(actions.deleteCliente(clienteId))
    };
};

export default connect(mapStateToProps, mapDisptachToProps)(Cliente);