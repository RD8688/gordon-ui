import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
class AnchorTag extends Component {
    render() {
        const { text, onClick, href, name, nestedElement,className } = this.props;
        return (
            <a className={classnames(className,'cursor_pointer')} onClick={onClick} href={href} name={name} >{nestedElement} {text}</a>
        );
    }
}

AnchorTag.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    name: PropTypes.string,
    nestedElement: PropTypes.object,
    className: PropTypes.string
};
export default AnchorTag;
