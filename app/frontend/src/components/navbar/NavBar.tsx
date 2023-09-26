// import { Link } from 'react-router-dom';
import { motion, useCycle } from 'framer-motion';
import { useState } from 'react';

import MenuToggle from './MenuToggle';
import { Menu } from './Menu';
import { SignInSignUp } from '../modals/ModalForm';
import './navbar.css'
import logo from '../../assets/table-bank-transparent-background.svg';
import { useWindowDimensions } from './useDimensions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loggedOut } from '../../store/main/reducer';

const sideBar = {
  open: (height: number = 1000) => ({
    clipPath:  `circle(${height * 2 + 200}px at 33px 3px)`,
    transition: {
      restDelta: 2,
      stiffness: 20,
      type: 'spring'
    }
  }),
  closed: {
    clipPath: 'circle(2.5rem at 3.3rem 3rem)',
    transition: {
      damping: 40,
      delay: 0.1,
      stiffness: 400,
      type: 'spring',
    }
  },
};

function NavBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { height, width } = useWindowDimensions();

  const [auth, setAuth] = useState({
    displayForm: false,
    status: '',
  });

  const loggedIn = useAppSelector(state => state.main.isLoggedIn);
  const dispatch = useAppDispatch();


  function handleClick(state: string = '', open: boolean = true) {
    setAuth({
      ...auth,
      displayForm: open,
      status: state,
    });
  }

  const listItem = <>
  <li>
    <a id='header_signin-btn' onClick={() => handleClick('signIn')}>Sign in</a>
  </li>
  <li>
    <a id='header_signup-btn' className='btn btn--primary btn--s' onClick={() => handleClick('signUp')}>Sign up</a>
  </li>
  </>;

  const listItemLogOut = <li><a id='header_signout-btn' onClick={() => dispatch(loggedOut())}>Sign out</a></li>;


  return (
    <>
      <header id='mobile-header'>
        <a href="/" id='mobile_header-logo'>
          <img src={logo} alt="logo" width={90} height={60}/>
        </a>
      </header>
      {width > 767 && <header id='header'>
        <a href="/" id='header-logo'>
          <img src={logo} alt="logo" width={100} height={60}/>
        </a>
        <nav className='navbar-menu' id='header_nav'>
          <ul>
            <li>
              <span className='divider'></span>
            </li>
            {loggedIn === true ? listItemLogOut: listItem}
          </ul>
        </nav>
        <SignInSignUp state={auth} openForm={handleClick}/>
      </header>}
      {width < 768 && <motion.nav className='header_menu-btn'
        initial={false}
        animate={isOpen || auth.status !== '' ? 'open' : 'closed'}
        custom={height}
        >
          <div id='mobile_menu-overlay' style={isOpen || auth.status !== '' ? {opacity: 1, visibility: 'visible'} : {}}></div>
          <motion.div className='background' custom={height} variants={sideBar} />
          <Menu isOpen={isOpen} openForm={handleClick} state={auth}/>
          <MenuToggle toggle={() => toggleOpen()}/>
      </motion.nav>}
    </>
  );
}

export default NavBar;