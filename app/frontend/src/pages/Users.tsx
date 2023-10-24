import { useAsyncValue } from "react-router-dom";
import { IUser } from "../interfaces";
import UserExcerpt from "./UserExcerpt";

export default function Users() {
  const users = useAsyncValue() as Array<IUser>;
  return (
    <ul>
      {users.map((user) => (<UserExcerpt key={user.id} user={user}/>))}
    </ul>
  );
}