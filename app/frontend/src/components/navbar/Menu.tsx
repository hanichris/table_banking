import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import { SignInSignUp } from '../modals/ModalForm';
import { MenuProp } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loggedOut } from '../../store/main/reducer';
import { removeLocalToken } from '../../utils';


const ulVariants = {
  open: {
    transition: { delayChildren: 0.2, staggerChildren: 0.07 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  }, 
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Menu = ( { state, openForm, isOpen, toggle }: MenuProp ) => {
  const loggedIn = useAppSelector(state => state.main.isLoggedIn);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    removeLocalToken();
    dispatch(loggedOut());
  };

  const listItemLoggedOut = <>
    <motion.li variants={liVariants}>
      <a onClick={() => openForm('signIn')}>Sign In</a>
    </motion.li>
    <motion.li variants={liVariants}>
      <a onClick={() => openForm('signUp')}>Sign Up</a>
    </motion.li>
  </>

  const listItemLoggedIn = <>
    <motion.li variants={liVariants}>
      <NavLink to='/dashboard/banks' onClick={toggle}>Banks</NavLink>
    </motion.li>
    <motion.li variants={liVariants}>
      <NavLink to='/dashboard/account' onClick={toggle}>Account</NavLink>
    </motion.li>
    <motion.li variants={liVariants}>
      <NavLink to='/dashboard/profile' onClick={toggle}>Profile</NavLink>
    </motion.li>
    <motion.li variants={liVariants}>
      <NavLink to='/' onClick={handleLogOut}>Sign Out</NavLink>
    </motion.li>
  </>

  return (
    <>
      <motion.ul variants={ulVariants} className={isOpen || state.status !== '' ? 'is-visible': ''}>
        <motion.li variants={liVariants}>
          <div>Account</div>
        </motion.li>
        {loggedIn === true ? listItemLoggedIn : listItemLoggedOut}
      </motion.ul>
      <SignInSignUp state={state} openForm={openForm}/> 
    </>
  );
};