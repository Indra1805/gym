export default function UserDashboard({ user }) {
  return (
    <div className="container mt-5">
      <h3>User Dashboard</h3>
      <div className="card p-3">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phno}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Weight:</strong> {user.weight}</p>
      </div>
    </div>
  );
}
