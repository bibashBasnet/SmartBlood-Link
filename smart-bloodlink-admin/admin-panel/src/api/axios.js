const BASE_URL = "http://localhost:8080/api"; // Update if your port is different

export async function getRequest(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return await response.json();
}

export async function postRequest(endpoint, data) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function putRequest(endpoint, data) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getRequestCoordinate(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return await response.json();
}
