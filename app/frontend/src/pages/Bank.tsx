import { useNavigate, useParams } from "react-router-dom";

export default function Bank() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <a onClick={() => navigate(-1)}>Back</a>
      <h2>Bank {params.bankId} page</h2>
    </>
  )
}