import React from 'react';
import './Header.css'
import logoNetflix from '../../image/logo_netflix.png'
import logoProfile from '../../image/logo_profile.png'

export const Header = ({black}) => {
    return (
        <header className={black ? 'black' : ''}> 
            <div className='header--logo'>
                <a href="/">
                    <img src={logoNetflix} alt="Netflix" />
                </a>
            </div>
            <div className='header--user'>
                <a href="/">
                    <img src={logoProfile} alt="Usuario" />
                </a>
            </div>
      </header>
  );
};
