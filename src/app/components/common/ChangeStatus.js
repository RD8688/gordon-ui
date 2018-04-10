import React from 'react';
import classnames from 'classnames';
import AnchorTag from '../common/AnchorTag.js';
import moment from 'moment';

class ChangeStatus extends React.Component {


    render() {

        const { object, changeStatus, index } = this.props;


        return (
            <div className="c_corporate_table_pro_head_act_inct">
                <AnchorTag name="statusActive" onClick={() => { changeStatus(object, true, index) }} className={(object.isActive == null || object.isActive == true) ? 'edit_vw_active_dactive_a' : 'edit_vw_active_dactive_a_text'} text='Active' />
                <AnchorTag name="statusInActive" onClick={() => { changeStatus(object, false, index) }} className={(object.isActive == false) ? 'edit_vw_active_dactive_d' : 'edit_vw_active_dactive_d_text'} text='Inactive' />
            </div>
        );
    }
}


ChangeStatus.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    object: PropTypes.object.isRequired,
    className: PropTypes.string,
    index: PropTypes.number
}


export default ChangeStatus;