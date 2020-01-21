// useState lets us declare state that changes over time
import React, { useState } from "react";

const defaultUsers = [
  { id: 1, name: "Cory", email: "c@h.com", role: "Admin" },
  { id: 2, name: "Wahid", email: "wahid@ag.com", role: "User" },
  { id: 3, name: "Frey", email: "frey@ag.com", role: "Admin" }
];

function App() {
  // Declare state because this info changes over time
  // and we want React to redraw the screen when this data changes.
  const [users, setUsers] = useState(defaultUsers);

  function deleteUser(userId) {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  }

  function renderUser(user) {
    return (
      <tr key={user.id}>
        <td>
          {/* Wrapping deleteUser in arrow to avoid immediate execution */}
          <button
            aria-label={"Delete " + user.name}
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    );
  }

  return (
    <>
      {/* In JSX, you must comment using this style */}
      <h1>Users</h1>
      <h2>Add User</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input id="name" type="text"></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input id="email" type="text"></input>
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <br />
          <input id="role" type="text"></input>
        </div>

        <input type="submit" value="Add User" />
      </form>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {/* using a point free style. JS automatically injects the user param */}
        <tbody>{users.map(renderUser)}</tbody>
      </table>
    </>
  );
}

export default App;
