// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Layout from './pages/Layout';
// import NoPage from './pages/NoPage';
import { useState } from 'react';

import UserForm from './components/UserForm';
import SignIn from "./components/modals/signin";
import SignUp from './components/modals/signup';

import './App.css'

interface Auth {
  state: string,
  form: boolean,
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [userForm, setUserForm] = useState(false);

  function handleSetStatus(form: Auth ) {
    setStatus(form.state);
    setUserForm(form.form);
  }

  if (status === '') {
    return (
      <main>
        <button onClick={() => handleSetStatus({form: true, state: 'signIn'})}>Sign In</button>
        <button onClick={() => handleSetStatus({form: true, state: 'signUp'})}>Sign Up</button>
      </main>
    );
  } else if (status === 'signIn') {
    return (
      <main>
        <button onClick={() => handleSetStatus({form: true, state: 'signIn'})}>Sign In</button>
        <button onClick={() => handleSetStatus({form: true, state: 'signUp'})}>Sign Up</button>
        {userForm && <UserForm status={status} setIsOpen={setIsOpen} setUserForm={setUserForm}/>}
        {(isOpen && status === 'signIn') && <SignIn isOpen={isOpen} setIsOpen={setIsOpen} setStatus={setStatus}/>}
      </main>
    );
  } else if (status === 'signUp') {
    return (
      <main>
        <button onClick={() => handleSetStatus({form: true, state: 'signIn'})}>Sign In</button>
        <button onClick={() => handleSetStatus({form: true, state: 'signUp'})}>Sign Up</button>
        {userForm && <UserForm status={status} setIsOpen={setIsOpen} setUserForm={setUserForm}/>}
        {(isOpen && status === 'signUp') && <SignUp isOpen={isOpen} setIsOpen={setIsOpen} setStatus={setStatus}/>}
      </main>
    );
  }

  // return (
  //   <main>
  //     <button onClick={() => setStatus('signIn')}>Sign in</button>
  //     <button onClick={() => setStatus('signUp')}>Sign up</button>
  //     {status === 'signIn' ? <UserForm status={status} setStatus={setStatus}/> : ''}
  //     {status === 'signUp' ? <UserForm status={status} setStatus={setStatus}/> : ''}
  //   </main>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='' element={ <Layout/> }>
    //       <Route index element={ <Home/> }/>
    //       <Route path='*' element={ <NoPage/> }/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  // );
}

export default App
