import { IUser } from "../interfaces";

export default function UserExcerpt({ user }: {user: IUser}) {
  return (
    <li>
      <div>
        {user.full_name}
      </div>
      <div>
        {user.full_name}
      </div>
      <div>
        {user.is_active}
      </div>
    </li>
  );
}