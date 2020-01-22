// API wrappers (Also known as API proxy)
// marking async because it returns a promise.
// Must mark as async so I can use the await keyword inside.
export async function getUsers() {
  const response = await fetch("http://localhost:3001/users");
  if (response.ok) return await response.json();
  throw new Error("Bad network response.");
}

export async function deleteUser(id) {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE"
  });
  if (response.ok) return await response.json();
  throw new Error("Bad network response.");
}

export async function addUser(user) {
  const response = await fetch(`http://localhost:3001/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
  if (response.ok) return await response.json();
  throw new Error("Bad network response.");
}
