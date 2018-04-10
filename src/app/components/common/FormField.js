import React from 'react';
import classnames from 'classnames';
import InputField from './InputField.js'
import PropTypes from 'prop-types'
class FormField extends React.Component {
    render() {

        const { spanTitle, name, error,value, type, onChange, fieldClassName,disabled } = this.props;
         var formFieldErrorClass = 'input-placeholder-colour-red';
        return (
            <div className="edit_vw_cntrct_pname">
                <span>{spanTitle}</span>
                <InputField
                    onChange={onChange}
                    value={value}
                    type={type}
                    name={name}
                    error={error}
                    disabled={disabled}
                    className={error!=null?formFieldErrorClass:fieldClassName}
                    errorClass='input-field-error' />
            </div>

        );
    }
}


FormField.propTypes = {
    spanTitle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    fieldClassName: PropTypes.string
}

FormField.defaultProps = {
    type: 'text',
    fieldClassName: '',
    value: ''
}

export default FormField;
