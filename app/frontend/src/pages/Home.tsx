import { CiBank } from 'react-icons/ci';

import './home.css';

export default function HomePage() {
  return (
    <div className='wrapper page-wrapper'>
      <div className='container'>
        <section className='landing-page'>
          <div>
            <CiBank className='bank-logo'/>
          </div>
          <h2> Welcome to your future of table banking</h2>
        </section>
      </div>
    </div>
  );
}