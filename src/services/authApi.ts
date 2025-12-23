export async function loginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}

export async function registerApi({
  displayName,
  email,
  password,
}: {
  displayName: string; // display name of the user
  email: string; // email of the user
  password: string; // password of the user
}) {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}

export async function getCurrentUserApi() {
  const res = await fetch(`/api/auth/me`);
  if (!res.ok) throw new Error("Failed to fetch user");

  const data = await res.json();
  return data.user;
}

export async function logoutApi() {
  const res = await fetch(`/api/auth/logout`, { method: "POST" }); // send a POST request to the server to log out the user
  if (!res.ok) throw new Error("Failed to log out");

  return res.json();
}
