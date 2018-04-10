import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import PropTypes from 'prop-types'
class Table extends React.Component {


    render() {
        const { data, headers, tableClassName,tHeadRowClass } = this.props;
        return (
            <table className={tableClassName} >
                <TableHeader
                    headers={headers} tHeadRowClass={tHeadRowClass}
                />
                <TableBody data={data} />
            </table>
        );
    }
}
Table.propTypes = {
    data: PropTypes.array.isRequired,
    tableClassName: PropTypes.string,
    headers: PropTypes.array.isRequired,
     tHeadRowClass:PropTypes.string


};

Table.defaultProps = {

    tableClassName: ''

};

export default Table;