import { useAsyncValue } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

import { I404, IBank } from "../interfaces";
import AdminBankExcerpt from "./AdminBankExcerpt";

export default function AdminBanks({ clear }: {clear: () => void}) {
  const banks = useAsyncValue() as Array<IBank> | IBank | I404;

  if (Array.isArray(banks)) {
    return (
      banks.map((bank) => (
      <AdminBankExcerpt key={bank.id} bank={bank}/>
      ))
    );
  }
  if ("detail" in banks) {
    return (
      <tr>
        <td className="no-results">
          <div className="no-results__container">
            <div>
              <HiOutlineMagnifyingGlass />
              <span>No bank found.</span>
              <a className="link link--primary" onClick={clear}>
                Clear filters
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <AdminBankExcerpt bank={banks}/>
  );
}