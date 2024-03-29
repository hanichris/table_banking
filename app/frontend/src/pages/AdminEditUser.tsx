import { useLoaderData, Form, useNavigate, useParams, useNavigation } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import { IUser } from "../interfaces";
import { Spinner } from "../components/Spinner";

export default function EditUser() {
  const user = useLoaderData() as IUser | null;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const params = useParams();
  if (!user) {
    return (
      <p>No user found</p>
    );
  }
  return (
    <section className="wrapper bank-page__wrapper">
      <div className="container container--xxl">
        <a onClick={() => navigate(-1)}><IoChevronBack /></a>
        <div id="bank-page__top">
          <header className="bank-page__header">
            <h2 className="bank-page__title">
              User id: {params.userID as string}
            </h2>
          </header>
        </div>
        <div className="bank-page__body">
          <Form method="post" id="user-form">
            <fieldset disabled={isSubmitting}>
              <legend className="visually-hidden">Users personal information</legend>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="form-field">
                  <input
                    type="text"
                    name="full_name"
                    id="fullname"
                    defaultValue={user.full_name}
                    placeholder="Full Name"
                    />
                  <i className="form-field-icon"></i>
                  <p className="form-help">Full name should be at least 3 characters and only contains letters</p>
                </div>
              </div>
              <div className="form-group" style={{marginTop: '0.5rem'}}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  placeholder="john@email.com"
                  defaultValue={user.email}
                  />
                  <i className="form-field-icon"></i>
                  <p className="form-help">Email should be a valid email address that matches the RFC standard</p>
              </div>
              <div className="form-group" style={{marginTop: '0.5rem'}}>
                <div>
                  <label>Active</label>
                  <div className="form-group__radio-btns">
                    <input
                      type="radio"
                      name="is_active"
                      id="is_active_yes"
                      value='true'
                      defaultChecked={user.is_active as boolean}/>
                    <label htmlFor="is_active_yes">Yes</label>
                    <input
                      type="radio"
                      name="is_active"
                      id="is_active_no"
                      value='false'
                      defaultChecked={!user.is_active as boolean} />
                    <label htmlFor="is_active_no">No</label>
                  </div>
                </div>
              </div>
              <div className="form-group" style={{marginTop: '0.5rem'}}>
                <div>
                  <label>Admin</label>
                  <div className="form-group__radio-btns">
                    <input
                      type="radio"
                      name="is_superuser"
                      id="is_superuser_yes"
                      value='true'
                      defaultChecked={user.is_superuser as boolean} />
                    <label htmlFor="is_superuser_yes">Yes</label>
                    <input
                      type="radio"
                      name="is_superuser"
                      id="is_superuser_no"
                      value='false'
                      defaultChecked={!user.is_superuser as boolean} />
                    <label htmlFor="is_superuser_no">No</label>
                  </div>
                </div>
              </div>
              <div className="form-group" style={{marginTop: '0.9rem'}}>
                <button type="submit" className={isSubmitting ? "btn btn--m btn--primary is-disabled": "btn btn--m btn--primary"}>
                  Update user details
                  {isSubmitting && <Spinner />}
                </button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </section>
  );
}