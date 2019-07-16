import React, { Component } from 'react';

import classes from './Sabor.module.css';
import PageTitle from '../../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import DataTableB from '../../../components/UI/DataTableB/DataTableB';
import { Badge, Nav, Button } from 'react-bootstrap';
import ZappSpinner from '../../../components/ZappSpinner/ZappSpinner';
import ModalB from '../../../components/UI/ModalB/ModalB';
import HocAux from '../../../hoc/hocAux/hocAux';
import SaborForm from './SaborForm/SaborForm';
import DeleteForm from '../../../components/DeleteForm/DeleteForm';
import * as actions from '../../../store/actions';
import RowActionAtivar from '../../../components/DataTable/RowActions/RowActionAtivar';
import RowActionEditar from '../../../components/DataTable/RowActions/RowActionEditar';
import RowActionExcluir from '../../../components/DataTable/RowActions/RowActionExcluir';

class Sabor extends Component {
    state = {
        loading: false,
        modalShow: false,
        formActionType: null,
        formElementId: null,
        formElementDescricao: null,
        page: 1,
        pageSize: 10
    }

    componentDidMount () {
        this.props.onGetSabores();
        this.props.onGetTamanhos();
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
        this.props.onDeleteSabor(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const saborData = {
            ativo: !row.ativo
        }
        this.props.onPutSaborEnable(row.hash_id, saborData);
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
                dataField: 'descricao',
                text: 'Descrição',
                sort: true,
            },
            {
                dataField: 'botoes',
                isDummyField: true,
                text: '',
                align: 'center',
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            <RowActionAtivar
                                row={row}
                                submitEnableHandler={this.submitEnableHandler}
                            />
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
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de sabores</h6>
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
                            <DataTableB
                                keyField='hash_id'
                                data={this.props.sabores}
                                columns={colunas}
                                page={this.state.page}
                                sizePerPage={this.state.pageSize}
                                totalSize={this.props.totalItems}
                            />
                        </div>
                    </div>
                </div>
                {spinner}
            </div>
        );

        let pageTitle = <PageTitle title={'Sabores'} subtitle='Informe os seus sabores' icon='fas fa-pizza-slice fa-2x'/>

        // let message;
        // if (this.props.error && this.props.error.message) {
        //     message = <Alert variant="danger">{this.props.error.message}</Alert>
        // }

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
                title="Sabor"
                handleClose={this.modalHandleClose}
            >
                <SaborForm 
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
            <HocAux>
                {modalForm}
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
        pending: state.sabor.sabor.api.pending,
        error: state.sabor.sabor.api.error,
        sabores: state.sabor.sabor.sabores,
        totalItems: state.sabor.sabor.totalItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetSabores: () => dispatch(actions.getSabores()),
        onPutSaborEnable: (saborId, saborData) => dispatch(actions.putSaborEnable(saborId, saborData)),
        onDeleteSabor: (saborId) => dispatch(actions.deleteSabor(saborId)),
        onGetTamanhos: () => dispatch(actions.getTamanhos(0, 50, 'descricao', 'asc'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sabor);