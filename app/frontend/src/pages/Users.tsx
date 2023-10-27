import { useAsyncValue } from "react-router-dom";
import { IUser } from "../interfaces";
import UserExcerpt from "./UserExcerpt";

export default function Users() {
  const users = useAsyncValue() as Array<IUser> | IUser;
  if (Array.isArray(users)) {
    return (
      users.map((user) => (
      <UserExcerpt key={user.id} user={user}/>
      ))
    );
  }
  return (
    <UserExcerpt user={users}/>
  );
}