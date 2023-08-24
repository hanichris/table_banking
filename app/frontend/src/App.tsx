// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Layout from './pages/Layout';
// import NoPage from './pages/NoPage';
import { useState } from 'react';
// import UserForm from './components/UserForm';
import SignIn from "./components/modals/signin";

import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <button onClick={() => setIsOpen(true)}>Sign in</button>
      {isOpen && <SignIn isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </main>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='' element={ <Layout/> }>
    //       <Route index element={ <Home/> }/>
    //       <Route path='*' element={ <NoPage/> }/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App
