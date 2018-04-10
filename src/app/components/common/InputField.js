import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types'

class InputField extends React.Component {
    render() {
        const { checked,name, value, type, error, onChange, onBlur, className,errorClass, placeholder,disabled } = this.props;
        
        return (
            <input className={classnames(className,  error!=null?errorClass:null )}
                title={error}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                checked={checked}
                type={type}
                name={name}
                
                placeholder={error != null ? error : placeholder}
            />
        );
    };
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    errorClass:PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

InputField.defaultProps = {
    type: 'text',
    className: '',
    value: ''
}

export default InputField;
