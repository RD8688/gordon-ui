import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'
class DropDown extends React.Component {

    getData() {
        const { data, setValue, selectedId, disabled, idColumnName, displayColumnName } = this.props;
        var returnObject = {};
        returnObject.options = [];
        returnObject.selected = null;
        var dropDown = [];
        if (data == null) {

            return returnObject;
        }

        var temp = 0;
        var selected;
        for (var key in data) {

            if (selectedId == data[key][idColumnName]) {
                selected = data[key];

            }
            returnObject.options.push(<option value={data[key][idColumnName]} key={temp} >
                {data[key][displayColumnName]}</option>);


            temp++
        }
        returnObject.selected = selected;
        return returnObject;
    }

    render() {
        var returnObject = this.getData();
        const { data, setValue, selectedId, disabled, idColumnName, displayColumnName, style,className } = this.props;
        return (

            disabled == true ? <select className={className} style={style} disabled value={returnObject.selected != null ? returnObject.selected[idColumnName] : ''} key={1} onChange={(event) => setValue(event.target.value)} >{returnObject.options}</select>
                : <select className={className} style={style} value={returnObject.selected != null ? returnObject.selected[idColumnName] : ''} key={1} onChange={(event) => setValue(event.target.value)} >{returnObject.options}</select>

        );
    }
}

DropDown.propTypes = {


    data: PropTypes.array,
    setValue: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    idColumnName: PropTypes.string.isRequired,
    displayColumnName: PropTypes.string.isRequired,
    style: PropTypes.object

}


export default DropDown;
