export const FetchPost = async (path, data) => {
    const API_URL = process.env.REACT_APP_PUBLIC_API_URL;
    try {
        const header = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        };
        const response = await fetch(
            `${API_URL}${path}`,
            {
                method: "POST",
                headers: header,
                body: data ? JSON.stringify(data) : null,
                cache: "no-store",
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch plans.");
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const FetchGet = async (path) => {
  const API_URL = process.env.REACT_APP_PUBLIC_API_URL;
  try {
    const header = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };

    const response = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: header,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
