import { Link } from "react-router-dom";

export default function BanksList() {

  return (
    <div id="dashboard_bank-listings">
      <header className="bank-listings__top">
        <h2 className="bank-listings__title">Bank Listings</h2>
      </header>
      <div className="bank-listings__body">
        <div className="bank-listings_content_none">
          <Link to='1'>First Bank</Link>
        </div>
      </div>
    </div>
  );
}