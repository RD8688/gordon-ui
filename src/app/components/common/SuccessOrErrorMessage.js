import React from 'react';
import classnames from 'classnames';
import {
   removeGeneralMessage
} from '../../actions/common.js';
import PropTypes from 'prop-types';
class SuccessOrErrorMessage extends React.Component {
    constructor(props) {
        super(props);
        this.closeErrorOrSuccessMessage = this.closeErrorOrSuccessMessage.bind(this);
    }
    closeErrorOrSuccessMessage() {
        const { dispatch } = this.props;
        dispatch(removeGeneralMessage());
    }
    render() {
        const { generalMessage } = this.props;
        let classname = 'green_back';
        if (!generalMessage.success) {
            classname = 'red_back';
        }
        return (
            <div className={classnames('alert_message_full', classname)} >{generalMessage.msg}
                <a onClick={this.closeErrorOrSuccessMessage}></a>
            </div>
        );
    }
}

SuccessOrErrorMessage.propTypes = {
    generalMessage: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired

};


export default SuccessOrErrorMessage;
