import React, { Component } from 'react';

import classes from './Tamanho.module.css';
import PageTitle from '../../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Badge, Nav, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import ZappSpinner from '../../../components/UI/ZappSpinner/ZappSpinner';
import ModalB from '../../../components/UI/ModalB/ModalB';
import Aux from '../../../hoc/Aux/Aux';
import TamanhoForm from './TamanhoForm/TamanhoForm';
import DeleteForm from '../../../components/DeleteForm/DeleteForm';
import * as actions from '../../../store/actions';

class Tamanho extends Component {
    state = {
        loading: false,
        modalShow: false,
        formActionType: null, // insert/update/view
        formElementId: null,
        formElementDescricao: null,
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
                // sort: true
            }, 
            {
                dataField: 'quantBordas',
                text: 'Bordas',
                align: 'center',
                // sort: true
            },
            {
                dataField: 'quantFatias',
                text: 'Fatias',
                align: 'center',
                // sort: true
            },
            {
                dataField: 'botoes',
                isDummyField: true,
                text: '',
                align: 'center',
                formatter: (cellContent, row) => {
                    // todo: transformar em componente
                    let enable = 'enable'
                    let icon = 'ban'
                    let tip = 'Desativar'
                    if (!row.ativo){
                        enable = 'disable'
                        icon = 'check'
                        tip = 'Ativar'
                    }
                    return <div>
                        <OverlayTrigger key='top-edit' placement='top' overlay={
                            <Tooltip id='tooltip-top-edit'>Editar</Tooltip>
                            }>
                            <i className='fas fa-edit' style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => this.modalFormUpdate(row)}></i>
                        </OverlayTrigger>
                        <OverlayTrigger key={`top-${enable}`} placement='top' overlay={
                            <Tooltip id={`tooltip-top-${enable}`}>{tip}</Tooltip>
                            }>
                            <i className={`fas fa-${icon}`} style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => this.submitEnableHandler(row)}></i>
                        </OverlayTrigger>
                        <OverlayTrigger key='top-delete' placement='top' overlay={
                            <Tooltip id='tooltip-top-delete'>Excluir</Tooltip>
                            }>
                            <i className='fas fa-trash-alt' style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => this.modalFormDelete(row)}></i>
                        </OverlayTrigger>
                    </div>
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
        ],
        page: 1,
        pageSize: 10,
        sortField: 'descricao',
        sortOrder: 'asc'
    }

    componentDidMount () {
        this.props.onGetTamanhos(this.state.page-1, this.state.pageSize, this.state.sortField, this.state.sortOrder);
    }

    modalFormInsert = () => {
        this.setState({ modalShow: true, formActionType: 'insert', formElementId: null });
    }

    modalFormUpdate = (row) => {
        this.setState({ modalShow: true, formActionType: 'update', formElementId: row.hash_id });
    }

    modalFormDelete = (row) => {
        this.setState({ modalShow: true, formActionType: 'delete', formElementId: row.hash_id, formElementDescricao: row.descricao });
    }

    modalHandleClose = () => {
        this.setState({ modalShow: false });
    }

    modalHandleDelete = (event) => {
        event.preventDefault()
        this.props.onDeleteTamanho(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const tamanhoData = {
            ativo: !row.ativo
        }
        this.props.onPutTamanhoEnable(row.hash_id, tamanhoData);
    }

    handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
        const currentIndex = (page - 1) * sizePerPage;
        // handle paginação
        if (type === 'pagination') {
            this.props.onGetTamanhos(currentIndex, sizePerPage, sortField, sortOrder);
            this.setState(() => ({
                page: page,
                pageSize: sizePerPage
            }));
        }

        // handle ordenação
        if (type === 'sort') {
            this.props.onGetTamanhos(currentIndex, sizePerPage, sortField, sortOrder);
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
                                remote
                                keyField='hash_id'
                                data={this.props.tamanhos}
                                columns={this.state.colunas}
                                pagination={paginationFactory({
                                    page: this.state.page,
                                    sizePerPage: this.state.pageSize,
                                    totalSize: this.props.totalItems
                                })}
                                onTableChange={this.handleTableChange}
                                bootstrap4={true}
                                noDataIndication={'Nenhum resgistro encontrado :('}
                                bordered={false}
                            />
                        </div>
                    </div>
                </div>
                {spinner}
            </div>
        );

        let pageTitle = <PageTitle title={'Tamanhos'} subtitle='Informe os seus tamanhos'/>

        if (!this.props.isAuthenticated) {
            pageTitle = null;
        }

        let message;
        if (this.props.error && this.props.error.message) {
            message = <Alert variant="danger">{this.props.error.message}</Alert>
        }

        let pageContent = (
            <div className="row">
                <div className="col-sm-12">
                    <div className={`card ${classes.Card}`}>
                        {message}
                        {grid}
                    </div>
                </div>
            </div>
        );

        let modalForm = (
            <ModalB className={classes.Modal}
                size='lg'
                show={this.state.modalShow && this.state.formActionType !== 'delete'}
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
        pending: state.pizza.tamanho.api.pending,
        error: state.pizza.tamanho.api.error,
        tamanhos: state.pizza.tamanho.tamanhos,
        totalItems: state.pizza.tamanho.totalItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTamanhos: (start, pageSize, sortField, sortOrder) => dispatch(actions.getTamanhos(start, pageSize, sortField, sortOrder)),
        onPutTamanhoEnable: (tamanhoId, TamanhoData) => dispatch(actions.putTamanhoEnable(tamanhoId, TamanhoData)),
        onDeleteTamanho: (tamanhoId) => dispatch(actions.deleteTamanho(tamanhoId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tamanho);