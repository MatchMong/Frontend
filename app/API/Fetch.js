export const FetchPost = async (path, data) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: data === null || data === undefined ? undefined : JSON.stringify(data),
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const FetchGet = async (path) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const FetchDelete = async (path) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const FetchPostAuth = async (path, data) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: data === null || data === undefined ? undefined : JSON.stringify(data),
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const FetchGetAuth = async (path) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// export const FetchPost = async (path, data) => {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(`${API_URL}${path}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "ngrok-skip-browser-warning": "true",
//       },
//       body: data === null || data === undefined ? undefined : JSON.stringify(data),
//       cache: "no-store",
//     });

//     const ct = res.headers.get("content-type") || "";
//     const payload = ct.includes("application/json") ? await res.json() : await res.text();

//     if (!res.ok) {
//       throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
//     }
//     return payload;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const FetchGet = async (path) => {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const header = {
//       "Content-Type": "application/json",
//       "ngrok-skip-browser-warning": "true",
//     };

//     const response = await fetch(`${API_URL}${path}`, {
//       method: "GET",
//       headers: header,
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch data.");
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const FetchDeleteAuth = async (path) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "true",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : JSON.stringify(payload));
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};