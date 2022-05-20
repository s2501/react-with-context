import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { INavItem, navItems } from '../../../utils/consts';
import './Nav.scss'

const Nav: React.FC = () => {
  return (
    <nav className='main-navigation'>
			{navItems.map((navItem: INavItem) => (
				navItem.path !== '*'
					? <NavLink className="nav-item" to={navItem.path} key={navItem.path}>{navItem.name}</NavLink>
					: null
				))}
    </nav>
  );
};

export default Nav;
