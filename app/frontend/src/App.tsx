// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Layout from './pages/Layout';
// import NoPage from './pages/NoPage';
// import './App.css'
import Home from './pages/Home.tsx';


function App() {
  return (
    <Home />
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
