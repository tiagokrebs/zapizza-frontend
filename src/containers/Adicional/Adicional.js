import React, { Component } from 'react';

import classes from './Adicional.module.css';
import PageTitle from '../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import DataTableB from '../../components/UI/DataTableB/DataTableB';
import { Badge, Nav, Button } from 'react-bootstrap';
import ZappSpinner from '../../components/ZappSpinner/ZappSpinner';
import ModalB from '../../components/UI/ModalB/ModalB';
import HocAux from '../../hoc/HocAux/HocAux';
import AdicionalForm from './AdicionalForm/AdicionalForm';
import DeleteForm from '../../components/DeleteForm/DeleteForm';
import * as actions from '../../store/actions';
import RowActions from '../../components/DataTable/RowActions/RowActions';

class Adicional extends Component {
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
        this.props.onGetAdicionais();
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
        this.props.onDeleteAdicional(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const adicionalData = {
            ativo: !row.ativo
        }
        this.props.onPutAdicionalEnable(row.hash_id, adicionalData);
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
                dataField: 'valor',
                text: 'Valor',
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
        ];

        let grid = (
            <div>
                <div className={`card-header ${classes.CardHeader}`}>
                    <h6 className={`card-title ${classes.CardTitle}`}>Lista de adicionais</h6>
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
                                data={this.props.adicionais}
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

        let pageTitle = <PageTitle title={'Adicionais'} subtitle='Informe as suas adicionais' icon='fas fa-plus fa-2x'/>

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
                title="Adicional"
                handleClose={this.modalHandleClose}
            >
                <AdicionalForm 
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
        pending: state.adicional.adicional.api.pending,
        error: state.adicional.adicional.api.error,
        adicionais: state.adicional.adicional.adicionais,
        totalItems: state.adicional.adicional.totalItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAdicionais: () => dispatch(actions.getAdicionais()),
        onPutAdicionalEnable: (adicionalId, adicionalData) => dispatch(actions.putAdicionalEnable(adicionalId, adicionalData)),
        onDeleteAdicional: (adicionalId) => dispatch(actions.deleteAdicional(adicionalId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Adicional);