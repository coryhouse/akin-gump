// useState lets us declare state that changes over time
import React, { useState } from "react";
import Input from "./Input";

const defaultUsers = [
  { id: 1, name: "Cory", email: "c@h.com", role: "Admin" },
  { id: 2, name: "Wahid", email: "wahid@ag.com", role: "User" },
  { id: 3, name: "Frey", email: "frey@ag.com", role: "Admin" }
];

const emptyUser = {
  name: "",
  email: "",
  role: ""
};

function App() {
  // Declare state because this info changes over time
  // and we want React to redraw the screen when this data changes.
  const [users, setUsers] = useState(defaultUsers);
  const [user, setUser] = useState(emptyUser);

  function deleteUser(userId) {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  }

  // Using computed property to reference a property via a variable
  function onChange({ target }) {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // create a copy of users array, and add new element to it.
    setUsers([...users, user]);
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
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          onChange={onChange}
          value={user.name}
        />

        <Input
          label="Email"
          id="email"
          name="email"
          onChange={onChange}
          value={user.email}
        />

        <Input
          label="Role"
          id="role"
          name="role"
          onChange={onChange}
          value={user.role}
        />

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
