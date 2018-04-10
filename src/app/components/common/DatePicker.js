import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types'
class Datepicker extends Component {

    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        const { selected } = this.props;
        var date = null;
        
        if (selected != null) {
            date = moment(selected);
        }
        this.state = {
            date: date
        }
    }
    setDate(date, name) {
        const { onChange } = this.props;
        if(date!=null){
             var e = { target: { name: name, value: date.format("YYYY-MM-DD") } };
        this.setState({ date: date });
        onChange(e);
        }
       
    }
   
    componentWillReceiveProps(nextProps){
         if(nextProps.selected!=null){
             this.setState({date:moment(nextProps.selected)});
         }else{
             this.setState({date:null});
         }
        
    }

     
    render() {

        const { name, placeholderText, error, selected, errorClass } = this.props;
        const { date } = this.state;
        return (
            <div title={error}>
                {error != null ? <a  title={error} className="error_img_icon" width="16" height="16" ><span></span></a> : ''}

                <DatePicker selected={date}
                    dateFormat="DD-MM-YYYY"
                    placeholderText={error != null ? error : placeholderText}
                    onChange={(date) => { this.setDate(date, name) }}
                    className={error != null ? errorClass : ''}
                />
            </div>
        );
    }
}

Datepicker.propTypes = {
    selected: PropTypes.string,
    placeholderText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errorClass: PropTypes.string.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default Datepicker;
