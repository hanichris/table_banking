import { motion, useCycle } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';

import { useWindowDimensions } from './useDimensions';
import { SignInSignUp } from '../modals/ModalForm';
// eslint-disable-next-line import/no-unresolved
import logoUrl from "/table-bank-transparent-background.svg?url";
import { Menu } from './Menu';
import { MenuToggle } from './MenuToggle';

const sideBar = {
  open: (height: number = 1000) => ({
    clipPath:  `circle(${height * 2 + 200}px at 33px 3px)`,
    transition: {
      restDelta: 2,
      stiffness: 20,
      type: 'spring',
    },
  }),

  closed: {
    clipPath: 'circle(2.5rem at 3.3rem 3rem)',
    transition: {
      damping: 40,
      delay: 0.1,
      stiffness: 400,
      type: 'spring',
    },
  },
};

export default function NavBar() {
  const { height, width } = useWindowDimensions();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [auth, setAuth] = useState({
    isRendered: false,
    status: '',
  });
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const handleClick = (state = '', open = true) => setAuth({
    ...auth,
    isRendered: open,
    status: state,
  });

  const loggedOut = <>
    <li>
      <a id='header_signin-btn' onClick={() => handleClick("signIn")}>Sign in</a>
    </li>
    <li>
      <a id='header_signup-btn' className='btn btn--primary btn--s' onClick={() => handleClick("signUp")}>Sign up</a>
    </li>
  </>

  const loggedIn = <li>
    <a id="header_signout-btn">Sign out</a>
  </li>

  return (
    <>
      <header id="mobile-header">
        <Link to="/" id="mobile_header-logo">
          <img src={logoUrl} alt="logo" width={90} height={60}/>
        </Link>
      </header>
      {width > 767 && 
      <header id='header'>
        <Link to="/" id="header-logo">
          <img src={logoUrl} alt="logo" width={100} height={60}/>
        </Link>
        <nav className='navbar-menu' id='header_nav'>
          <ul>
            <li><span className='divider'></span></li>
            {isHomepage === true ? loggedOut: loggedIn}
          </ul>
        </nav>
        {isHomepage && <SignInSignUp state={auth} toggleForm={handleClick}/>}
      </header>}
      {width < 768 &&
      <motion.nav className='header_menu-btn'
      initial={false}
      animate={isOpen || auth.status !== '' ? 'open' : 'closed'}
      custom={height}>
        <div id="mobile_menu-overlay" style={isOpen || auth.status !== '' ? {opacity: 1, visibility: 'visible'} : {}}></div>
        <motion.div className='background' custom={height} variants={sideBar}/>
        <Menu isOpen={isOpen} toggleForm={handleClick} state={auth} toggle={() => toggleOpen()} onHomepage={isHomepage}/>
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>}
    </>
  );
}