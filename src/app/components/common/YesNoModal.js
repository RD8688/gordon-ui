import React from 'react';
import Modal from 'react-modal';

class YesNoModal extends React.Component {
    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        const { modalIsOpen, modalAction } = this.props;
        return (
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Sure Modal"
            >
                <div className="row">
                    <div className="form-group col-md-6">
                        <button type="submit" className={'btn btn-success'} onClick={() => { modalAction(true) }}>Yes</button>

                    </div>
                    <div className="form-group col-md-6">
                        <button type="submit" className={'btn btn-success'} onClick={() => { modalAction(false) }}>No</button>

                    </div>
                </div>
            </Modal>

        );
    }
}

export default YesNoModal;

