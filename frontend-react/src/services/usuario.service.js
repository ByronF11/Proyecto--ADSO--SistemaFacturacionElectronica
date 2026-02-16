const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data &&
        (data.message || data.error || (Array.isArray(data.errors) && data.errors[0] && data.errors[0].message))) ||
      `Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const UsuariosAPI = {
  getById: (id) => request(`/usuarios/${encodeURIComponent(String(id))}`),

  update: (id, payload) =>
    request(`/usuarios/${encodeURIComponent(String(id))}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  create: (payload) =>
    request(`/usuarios`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  remove: (id) =>
    request(`/usuarios/${encodeURIComponent(String(id))}`, {
      method: "DELETE",
    }),

  list: (query = "") => {
    const qs = query ? `?search=${encodeURIComponent(query)}` : "";
    return request(`/usuarios${qs}`);
  },
};
