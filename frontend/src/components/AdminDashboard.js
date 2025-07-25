


// import { useEffect, useState } from "react";
// import api from "../api";

// export default function AdminDashboard({ user }) {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     api.get("api/admin/users/")
//       .then((res) => setUsers(res.data.results || res.data)) // handle pagination
//       .catch((err) => console.error("Failed to load users", err));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3>Admin Dashboard</h3>
//       <div className="card p-3 mb-4">
//         <p><strong>Welcome Admin:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p>You have full access to manage the system.</p>
//       </div>

//       <h4>All Registered Users</h4>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Weight</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               <td>{u.phno}</td>
//               <td>{u.age}</td>
//               <td>{u.gender}</td>
//               <td>{u.weight}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { fetchUsers, fetchWorkouts, assignWorkouts } from "../services/AdminService";

// export default function AdminDashboard({ user }) {
//   const [users, setUsers] = useState([]);
//   const [workouts, setWorkouts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedWorkouts, setSelectedWorkouts] = useState([]);

//   useEffect(() => {
//     fetchUsers().then(setUsers);
//     fetchWorkouts().then(setWorkouts);
//   }, []);

//   const handleAssign = async () => {
//     if (!selectedUser) return alert("Select a user");
//     await assignWorkouts(selectedUser, selectedWorkouts);
//     alert("Workouts assigned successfully");
//     setSelectedUser(null);
//     setSelectedWorkouts([]);
//   };

//   const handleWorkoutSelection = (id) => {
//     setSelectedWorkouts((prev) =>
//       prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Admin Dashboard</h3>
//       <div className="card p-3 mb-4">
//         <p><strong>Welcome Admin:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//       </div>

//       <h4>All Registered Users</h4>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Workouts</th>
//             <th>Select</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               {/* <td>{u.workouts.map((w) => w.name).join(", ") || "None"}</td> */}
//               <td>{(u.workouts && u.workouts.length > 0) ? u.workouts.map(w => w.name).join(", ") : "None"}</td>
//               <td>
//                 <input
//                   type="radio"
//                   name="selectedUser"
//                   checked={selectedUser === u.id}
//                   onChange={() => setSelectedUser(u.id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedUser && (
//         <>
//           <h5 className="mt-4">Assign Workouts</h5>
//           {workouts.map((w) => (
//             <div key={w.id}>
//               <input
//                 type="checkbox"
//                 checked={selectedWorkouts.includes(w.id)}
//                 onChange={() => handleWorkoutSelection(w.id)}
//               />{" "}
//               {w.name}
//             </div>
//           ))}
//           <button onClick={handleAssign} className="btn btn-success mt-3">
//             Assign Workouts
//           </button>
//         </>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { fetchUsers, fetchWorkouts, assignWorkouts } from "../services/AdminService";

export default function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWorkouts, setModalWorkouts] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchWorkouts().then(setWorkouts);
  }, []);

  const handleAssign = async () => {
    if (!selectedUser) return alert("Select a user");
    await assignWorkouts(selectedUser, selectedWorkouts);
    alert("Workouts assigned successfully");
    fetchUsers().then(setUsers); // refresh after assignment
    setSelectedUser(null);
    setSelectedWorkouts([]);
  };

  const handleWorkoutSelection = (id) => {
    setSelectedWorkouts((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const openWorkoutsModal = (workouts) => {
    setModalWorkouts(workouts);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalWorkouts([]);
  };

  return (
    <div className="container mt-5">
      <h3>Admin Dashboard</h3>
      <div className="card p-3 mb-4">
        <p><strong>Welcome Admin:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h4>All Registered Users</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Weight</th>
            <th>Workouts</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phno || "N/A"}</td>
              <td>{u.age || "N/A"}</td>
              <td>{u.gender || "N/A"}</td>
              <td>{u.weight || "N/A"}</td>
              <td>
                <button
                  className="btn btn-link p-0"
                  onClick={() => openWorkoutsModal(u.workouts || [])}
                >
                  Assigned Workouts
                </button>
              </td>
              <td>
                <input
                  type="radio"
                  name="selectedUser"
                  checked={selectedUser === u.id}
                  onChange={() => setSelectedUser(u.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <>
          <h5 className="mt-4">Assign Workouts</h5>
          {workouts.map((w) => (
            <div key={w.id}>
              <input
                type="checkbox"
                checked={selectedWorkouts.includes(w.id)}
                onChange={() => handleWorkoutSelection(w.id)}
              />{" "}
              {w.name}
            </div>
          ))}
          <button onClick={handleAssign} className="btn btn-success mt-3">
            Assign Workouts
          </button>
        </>
      )}

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assigned Workouts</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modalWorkouts.length > 0 ? (
                  <ul>
                    {modalWorkouts.map((w) => (
                      <li key={w.id}>{w.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No workouts assigned</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
