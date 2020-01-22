// useState lets us declare state that changes over time
import React, { useState, useEffect } from "react";
import Input from "./Input";
import * as userApi from "./api/userApi";

const emptyUser = {
  name: "",
  email: "",
  role: ""
};

function App() {
  // Declare state because this info changes over time
  // and we want React to redraw the screen when this data changes.
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyUser);

  // This runs code after render
  useEffect(() => {
    async function init() {
      try {
        const users = await userApi.getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
        // TODO, in real app, show error page
      }
    }

    init();
    // Empty dependency array means this useEffect will only run once on initial load.
  }, []);

  async function deleteUser(userId) {
    try {
      await userApi.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Using computed property to reference a property via a variable
  function onChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await userApi.addUser(user);
      // create a copy of users array, and add new element to it.
      setUsers([...users, user]);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
