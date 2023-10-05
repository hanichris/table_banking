import { CiBank } from "react-icons/ci";

export default function Index() {
  return (
    <div className="wrapper">
      <div className="container container--xl">
        <section style={{textAlign: 'center'}}>
          <div>
            <CiBank style={{width: '20rem', height: '20rem', color: '#f2f2f3'}}/>
          </div>
          <div data-label='salutations'></div>
        </section>
      </div>
    </div>
  );
}