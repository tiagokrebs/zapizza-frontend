import React, { Component } from 'react';

import classes from './Tamanho.module.css';
import PageTitle from '../../../components/Page/PageTitle/PageTitle';
import { connect } from 'react-redux';
import DataTableB from '../../../components/UI/DataTableB/DataTableB';
import { Badge, Nav, Button } from 'react-bootstrap';
import ZappSpinner from '../../../components/ZappSpinner/ZappSpinner';
import ModalB from '../../../components/UI/ModalB/ModalB';
import Aux from '../../../hoc/Aux/Aux';
import TamanhoForm from './TamanhoForm/TamanhoForm';
import DeleteForm from '../../../components/DeleteForm/DeleteForm';
import * as actions from '../../../store/actions';
import RowActions from '../../../components/DataTable/RowActions/RowActions';

class Tamanho extends Component {
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
        this.props.onDeleteTamanho(this.state.formElementId);
        this.setState({ modalShow: false });
    }

    submitEnableHandler = (row) => {
        const tamanhoData = {
            ativo: !row.ativo
        }
        this.props.onPutTamanhoEnable(row.hash_id, tamanhoData);
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
                            <DataTableB
                                keyField='hash_id'
                                data={this.props.tamanhos}
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

        let pageTitle = <PageTitle title={'Tamanhos'} subtitle='Informe os seus tamanhos' icon='fas fa-chart-pie fa-2x'/>

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
        pending: state.tamanho.tamanho.api.pending,
        error: state.tamanho.tamanho.api.error,
        tamanhos: state.tamanho.tamanho.tamanhos,
        totalItems: state.tamanho.tamanho.totalItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTamanhos: () => dispatch(actions.getTamanhos()),
        onPutTamanhoEnable: (tamanhoId, TamanhoData) => dispatch(actions.putTamanhoEnable(tamanhoId, TamanhoData)),
        onDeleteTamanho: (tamanhoId) => dispatch(actions.deleteTamanho(tamanhoId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tamanho);