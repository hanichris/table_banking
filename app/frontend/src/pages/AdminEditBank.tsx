import { IoChevronBack } from "react-icons/io5";
import { useLoaderData, useNavigate, useNavigation, Form } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { IBank } from "../interfaces";

export default function AdminEditBank() {
  const bank = useLoaderData() as IBank;
  const navigation = useNavigation();
  const navigate = useNavigate()
  
  const isSubmitting = navigation.state === 'submitting';

  return(
    <section className="wrapper bank-page__wrapper">
      <div className="container container--xxl">
        <a onClick={() => navigate(-1)}><IoChevronBack /></a>
        <div id="bank-page__top">
          <header className="bank-page__header">
            <h2 className="bank-page__title">
              {bank.title}
            </h2>
          </header>
        </div>
        <div className="bank-page__body">
          <div className="panel _m-b-4">
            <header>
              <h3>Bank Title</h3>
            </header>
            <div className="panel-body">
              <Form method='post'>
                <fieldset disabled={isSubmitting}>
                  <legend className="visually-hidden">Bank title</legend>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className="form-field">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter bank title"
                        defaultValue={bank.title}/>
                      <i className="form-field-icon"></i>
                      <p className="form-help">Title should be at least 3 characters and only contains letters</p>
                    </div>
                  </div>
                  <div className="_m-t-4">
                    <button type="submit" className={isSubmitting ? "btn btn--m btn--primary is-disabled": "btn btn--m btn--primary"}>
                      Update bank title
                      {isSubmitting && <Spinner />}
                    </button>
                  </div>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}