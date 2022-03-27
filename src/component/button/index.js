// Reusable Button component to be used in future but not in this assignemnt. We already have re-usable material UI Button

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * @param {string} type - type of input component
 * @param {string} label  - name of the input component
 * @param {func} handleClick - perform action when input elelment is clicked
 *  
 * @returns {HTMLButtonElement} - button element
 */
export const Button = ({
    type = 'button',
    label,
    handleClick

}) => {
    return (
        <input type={type} value={label} onClick={handleClick} />
    )
};

Button.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    handleClick: PropTypes.func
};
