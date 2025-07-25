import { useEffect, useState } from "react";
import { getUser, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => {
        alert("Unauthorized!");
        navigate("/login");
      });
  }, [navigate]);

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div>
      {user.is_superuser ? <AdminDashboard user={user} /> : <UserDashboard user={user} />}
      <div className="container">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="btn btn-danger mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
