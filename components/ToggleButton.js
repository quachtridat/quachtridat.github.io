// GitHub: webomnizz/react-toggle-button
// Modified to work with React's deprecation of `defaultProps`.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CheckedIcon = () => <>🌜</>;
const UncheckedIcon = () => <>🌞</>;

export const ToggleButton = ( props ) => {

    const { defaultChecked, onChange, disabled, className } = props;
    const [toggle, setToggle] = useState(defaultChecked || false);

    const triggerToggle = () => {
        if ( disabled ) {
            return;
        }

        setToggle(!toggle);

        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    const getIcon = (type) => {
        const {
            icons = {
                checked: <CheckedIcon />, 
                unchecked: <UncheckedIcon />
            }
        } = props;

        if ( ! icons ) {
            return null;
        }

        return icons[type] === undefined ?
            ToggleButton.defaultProps.icons[type] :
            icons[type];
    }

    const toggleClasses = classNames('wrg-toggle', {
        'wrg-toggle--checked': toggle,
        'wrg-toggle--disabled': disabled
    }, className);

    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>{ getIcon('checked') }</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>{ getIcon('unchecked') }</span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input type="checkbox" aria-label="Toggle Button" className="wrg-toggle-input" />
        </div>
    );
}

ToggleButton.propTypes = {
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            checked: PropTypes.node,
            unchecked: PropTypes.node
        })
    ])
};

export default ToggleButton;