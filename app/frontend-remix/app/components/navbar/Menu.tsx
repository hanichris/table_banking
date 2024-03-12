/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { motion } from "framer-motion";

import { SignInSignUp } from "../modals/ModalForm";
import { NavLink } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { IMenuProp } from "~/interfaces";

const ulVariants = {
  open: {
    transition: { delayChildren: 0.2, staggerChildren: 0.07 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  }
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

export const Menu = ({ state, toggleForm, isOpen, toggle, onHomepage }: IMenuProp) => {
  const isLoggedOut = <>
    <motion.li variants={liVariants}>
      <a onClick={() => toggleForm("signIn")}>Sign In</a>
    </motion.li>
    <motion.li variants={liVariants}>
      <a onClick={() => toggleForm("signUp")}>Sign Up</a>
    </motion.li>
  </>

  const isLoggedIn = <>
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
      <NavLink to='/' >Sign Out</NavLink>
    </motion.li>
  </>

  return (
    <>
      <motion.ul variants={ulVariants} className={isOpen || state.status != '' ? "is-visible" : ""}>
        <motion.li variants={liVariants}>
          <div>Account</div>
        </motion.li>
        {onHomepage === true ?
          isLoggedOut :
          isLoggedIn
        }
        {onHomepage && <SignInSignUp state={state} toggleForm={toggleForm}/>}
      </motion.ul>
    </>
  );
}