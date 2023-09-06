// import { Link } from 'react-router-dom';
import { motion, useCycle } from 'framer-motion';
import { useRef } from 'react';

import MenuToggle from './MenuToggle';
import './navbar.css'
import logo from '../../assets/table-bank-transparent-background.svg';
import { useDimensions } from './useDimensions';

const sideBar = {
  open: (height: number) => ({
    clipPath:  `circle(${height * 2 + 20}rem at 3.3rem 3rem)`,
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
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <header id='mobile-header'>
        <a href="/" id='mobile_header-logo'>
          <img src={logo} alt="logo" width={90} height={60}/>
        </a>
      </header>
      <header id='header'>
        <a href="/" id='header-logo'>
          <img src={logo} alt="logo" width={100} height={60}/>
        </a>
        <nav className='navbar-menu' id='header_nav'>
          <ul>
            <li>
              <span className='divider'></span>
            </li>
            <li>
              <a href="" id='header_signin-btn'>Sign in</a>
            </li>
            <li>
              <a href="" id='header_signup-btn' className='btn btn--primary btn--s'>Sign up</a>
            </li>
          </ul>
        </nav>
      </header>
      <motion.nav className='header_menu-btn'
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        >
          <div id='mobile_menu-overlay' style={isOpen ? {opacity: 1, visibility: 'visible'} : {}}></div>
          <motion.div className='background' custom={height} variants={sideBar} />
          <MenuToggle toggle={() => toggleOpen()}/>
      </motion.nav>
    </>
  );
}

export default NavBar;