import { motion, useCycle } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@remix-run/react';

import { useWindowDimensions } from './useDimensions';

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

  const handleClick = (state = '', open = true) => setAuth({
    ...auth,
    isRendered: open,
    status: state,
  });

  return (
    <>
      <header id="mobile-header">
        <Link to="/" id="mobile_header-logo">
          <img src="" alt="logo" width={90} height={60}/>
        </Link>
      </header>
      {width > 767 && 
      <header id='header'>
        <Link to="/" id="header-logo">
          <img src="" alt="logo" width={100} height={60}/>
        </Link>
        <nav className='navbar-menu' id='header_nav'>
          <ul>
            <li><span className='divider'></span></li>
            <li>
              <a id="header_signin-btn" onClick={() => handleClick("signIn")}>Sign in</a>
            </li>
            <li>
            <a id="header_signup-btn" className="btn btn--primary btn--s" onClick={() => handleClick("signUp")}>Sign up</a>
            </li>
          </ul>
        </nav>
      </header>}
      {width < 768 &&
      <motion.nav className='header_menu-btn'
      initial={false}
      animate={isOpen || auth.status !== '' ? 'open' : 'closed'}
      custom={height}>
        <div id="mobile_menu-overlay"></div>
        <motion.div className='background' custom={height} variants={sideBar}/>
      </motion.nav>}
    </>
  );
}