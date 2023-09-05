// import { Link } from 'react-router-dom';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';
import './navbar.css'
import logo from '../../assets/table-bank-transparent-background.svg';

function NavBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <>
      <header id='mobile-header'>
          <motion.nav className='header_menu-btn'
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          >
            <MenuToggle toggle={() => toggleOpen()}/>
          </motion.nav>
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
    </>
  );
}

export default NavBar;