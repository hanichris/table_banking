import { motion } from 'framer-motion';

import { SignInSignUp } from '../modals/ModalForm';
import { MenuProp } from '../../interfaces';


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

export const Menu = ( { state, openForm, isOpen }: MenuProp ) => {

  return (
    <>
      <motion.ul variants={ulVariants} className={isOpen || state.status !== '' ? 'is-visible': ''}>
        <motion.li variants={liVariants}>
          <div>Account</div>
        </motion.li>
        <motion.li variants={liVariants}>
          <a onClick={() => openForm('signIn')}>Sign In</a>
        </motion.li>
        <motion.li variants={liVariants}>
          <a onClick={() => openForm('signUp')}>Sign Up</a>
        </motion.li>
      </motion.ul>
      <SignInSignUp state={state} openForm={openForm}/> 
    </>
  );
};