import { motion } from 'framer-motion';
import { useState } from 'react';

import UserForm from '../UserForm';
import SignIn from '../modals/signin';
import SignUp from '../modals/signup';


type MenuProp = {
  isOpen: boolean,
}

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

export const Menu = ( { isOpen }: MenuProp ) => {
  const [auth, setAuth] = useState({
    displayForm: false,
    status: '',
  });

  function handleClick(state: string = '', open: boolean = true) {
    setAuth({
      ...auth,
      displayForm: open,
      status: state,
    });
  }

  return (
    <>
      <motion.ul variants={ulVariants} className={isOpen ? 'is-visible': ''}>
        <motion.li variants={liVariants}>
          <div>Account</div>
        </motion.li>
        <motion.li variants={liVariants}>
          <a onClick={() => handleClick('signIn')}>Sign In</a>
        </motion.li>
        <motion.li variants={liVariants}>
          <a onClick={() => handleClick('signUp')}>Sign Up</a>
        </motion.li>
      </motion.ul>
      <UserForm openForm={handleClick} state={auth}/>
      {auth.status === 'signIn' && <SignIn state={auth} openForm={handleClick}/>}
      {auth.status === 'signUp' && <SignUp state={auth} openForm={handleClick}/>} 
    </>
  );
};