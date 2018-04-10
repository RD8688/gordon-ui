import React from 'react';
import PropTypes from 'prop-types';
import PropTypes from 'prop-types'

class TableBody extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <tbody>
                {data}
            </tbody>
        );
    }
}

TableBody.propTypes = {
    data: PropTypes.array,

}
export default TableBody;