import React from 'react';
import './header.css';

export const Header = (props) => {
    return (
        <div className='header-container'>
            <div className="header-container--title">
                <label>{props.title}</label>
            </div>
        </div>
    )
}