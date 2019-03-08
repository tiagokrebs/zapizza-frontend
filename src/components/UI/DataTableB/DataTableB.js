import React from 'react';

import './DataTableB.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';

const dataTableRemote = (props) => (
    <BootstrapTable 
        remote={props.remote}
        keyField={props.keyField}
        data={props.data}
        columns={props.columns}
        pagination={paginationFactory({
            page: props.page,
            sizePerPage: props.sizePerPage,
            totalSize: props.totalSize
        })}
        filter={filterFactory()}
        onTableChange={props.onTableChange}
        bootstrap4={true}
        noDataIndication={'Nenhum resgistro encontrado :('}
        bordered={false}
    />
);

export default dataTableRemote;