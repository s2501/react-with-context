import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../logo.svg';
import Nav from '../Nav/Nav';

import styles from './Header.module.scss';


const Header: React.FC = () => {
  return (
    <header>
      <h1> 
        <Link to="/" className={styles['main-link']}>{/* <Logo className={styles.logo} /> */} Crypto Service</Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
