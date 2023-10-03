import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from 'react-icons/io5';

export default function Bank() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div id="bank-page">
      <a onClick={() => navigate(-1)}><IoChevronBack /></a>
      <header className="bank-page__top">
        <h2 className="bank-page__title">
          Bank {params.bankId} page
        </h2>
      </header>
    </div>
  )
}