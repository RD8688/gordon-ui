import React from 'react';
import PropTypes from 'prop-types';
import PropTypes from 'prop-types'


class TableHeader extends React.Component {



  render() {
    const { headers,tHeadRowClass } = this.props;
    return (
      <thead >
       <tr className={tHeadRowClass} >{headers}</tr>
      </thead>
      
    );
  }
}

TableHeader.propTypes = {
  headers: PropTypes.array,
  tHeadRowClass:PropTypes.string

}

export default TableHeader;