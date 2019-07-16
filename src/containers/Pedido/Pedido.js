import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Pedido.module.css';
import * as actions from '../../store/actions/';
import ZappSpinner from '../../components/ZappSpinner/ZappSpinner';
import RowActionEditar from '../../components/DataTable/RowActions/RowActionEditar';
import RowActionExcluir from '../../components/DataTable/RowActions/RowActionExcluir';
import { Badge, Nav, Button } from 'react-bootstrap';
import DataTableB from '../../components/UI/DataTableB/DataTableB';
import PageTitle from '../../components/Page/PageTitle/PageTitle';
import ModalB from '../../components/UI/ModalB/ModalB';
import DeleteForm from '../../components/DeleteForm/DeleteForm';
import HocAux from '../../hoc/hocAux/hocAux';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';


class Pedido extends Component {
    static nomeFilter;
    static ativoFilter;

    state = {
        loading: false,
        modalShow: false,
        formActionType: null,
        formElementId: null,
        formElementDescricao: null,
        page: 1,
        pageSize: 10,
        sortField: 'finalizacao',
        sortOrder: 'desc'
    }

    componentDidMount() {
        // Chamada abaixo não é necessária porque ao criar grade handleTableChange é chamado
        // Retirado para evitar consulta dupla a API no carregamento de /pedidos
        // this.props.onGetPedidos(this.state.page-1, this.state.pageSize, this.state.sortField, this.state.sortOrder, {ativo: true});
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
        this.props.onDeletePedido(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const pedidoData = {
            ativo: !row.ativo
        }
        this.props.onPutPedidoEnable(row.hash_id, pedidoData);
    }

    handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, filters }) => {
        const currentIndex = (page - 1) * sizePerPage;

        let filterFields = {};
        for (const dataField in filters) {
            const { filterVal } = filters[dataField];
            filterFields = {
                ...filterFields,
                [dataField]: filterVal
            }
        }

        // handle filtros
        if (type === 'filter') {
            this.props.onGetPedidos(0, sizePerPage, sortField, sortOrder, filterFields);
            this.setState(() => ({
                page: 1
            }));
        }

        // handle paginação
        if (type === 'pagination') {
            this.props.onGetPedidos(currentIndex, sizePerPage, sortField, sortOrder, filterFields);
            this.setState(() => ({
                page: page,
                pageSize: sizePerPage
            }));
        }

        // handle ordenação
        if (type === 'sort') {
            this.props.onGetPedidos(currentIndex, sizePerPage, sortField, sortOrder, filterFields);
            this.setState(() => ({
                sortField: sortField,
                sortOrder: sortOrder
            }));
        }
    }

    handleFilterClear = () => {
        this.nomeFilter('');
        this.ativoFilter('');
    }

    render() {
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
                dataField: 'cliente.nome',
                text: 'Cliente',
                sort: true,
                filter: textFilter({
                    placeholder: 'Informe o cliente',
                    delay: 1000,
                    getFilter: (filter) => {
                        this.nomeFilter = filter;
                    }
                })
            },
            {
                dataField: 'botoes',
                isDummyField: true,
                text: '',
                align: 'center',
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            {/* <RowActionAtivar
                                row={row}
                                submitEnableHandler={this.submitEnableHandler}
                            /> */}
                            <RowActionEditar
                                row={row}
                                modalFormUpdate={this.modalFormUpdate}
                            />
                            <RowActionExcluir
                                row={row}
                                modalFormDelete={this.modalFormDelete}
                            />
                        </div>
                    )
                }
            },
            {
                dataField: 'ativo',
                isDummyField: true,
                text: 'Status',
                align: 'center',
                filter: selectFilter({
                    placeholder: 'Selecione',
                    options: {
                        true: 'Ativo',
                        false: 'Inativo'
                    },
                    getFilter: (filter) => {
                        this.ativoFilter = filter;
                    },
                    defaultValue: 'true'
                }),
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
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de pedidos</h6>
                    <Nav className="pull-right">
                        <Nav.Item>
                            <Button variant="outline-light" size="sm" onClick={this.handleFilterClear}>
                                <i className="fas fa-filter"></i>
                                <span> Limpar Filtros</span>
                            </Button>
                        </Nav.Item>
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
                            <DataTableB
                                remote
                                keyField='hash_id'
                                data={this.props.pedidos}
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

        let pageTitle = <PageTitle title={'Pedidos'} subtitle='Informe os seus pedidos' icon='fas fa-users fa-2x' />

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

        // let modalForm = (
        //     <ModalB className={classes.Modal}
        //         size='lg'
        //         show={this.state.modalShow && this.state.formActionType !== 'delete'}
        //         title="Pedido"
        //         handleClose={this.modalHandleClose}
        //     >
        //         <PedidoForm 
        //             modalClose={this.modalHandleClose}
        //             formAction={this.state.formActionType}
        //             elementId={this.state.formElementId}
        //         />
        //     </ModalB>
        // );

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
            <HocAux>
                {/* {modalForm} */}
                {modalFormDelete}
                {pageTitle}
                {pageContent}
            </HocAux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pending: state.pedido.pedido.api.pending,
        error: state.pedido.pedido.api.error,
        pedidos: state.pedido.pedido.pedidos,
        totalItems: state.pedido.pedido.totalItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPedidos: (start, pageSize, sortField, sortOrder, filterFields) => dispatch(actions.getPedidos(start, pageSize, sortField, sortOrder, filterFields)),
        onDeletePedido: (pedidoId) => dispatch(actions.deletePedido(pedidoId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedido);