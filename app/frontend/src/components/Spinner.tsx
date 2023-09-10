import ReactLoading from 'react-loading';

import './spinner.css'

export const Spinner = () => (
  <ReactLoading type='spin' width={'1.8rem'} height={'1.8rem'}className='is-loading'/>
);