import axios from "axios";
import { useRouter } from "next/navigation";

interface UserProps {
  id: Number;
  name: String;
  email: String;
  company: any;
  address: any;
}

export default function User(user: UserProps) {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={() => router.push(`posts/${user.id}`)}
        className="border border-white/20 p-4 lg:px-10 rounded-xl cursor-pointer hover:shadow-md hover:shadow-white/20 focus:bg-white/20"
      >
        <div className="grid grid-cols-3">
          <label className="label">ID</label>
          <p className="value">{`${user.id}`}</p>
        </div>
        <div className="grid grid-cols-3">
          <label className="label">Name</label>
          <p className="value">{user.name}</p>
        </div>
        <div className="grid grid-cols-3">
          <label className="label">Email</label>
          <p className="value">{user.email}</p>
        </div>
        <div className="grid grid-cols-3">
          <label className="label">Company Name</label>
          <p className="value">{user.company.name}</p>
        </div>
        <div className="grid grid-cols-3">
          <label className="label">Address</label>
          <p className="value">
            {user.address?.suite}, {user.address?.street}, {user.address?.city}{" "}
            - {user.address?.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
}
