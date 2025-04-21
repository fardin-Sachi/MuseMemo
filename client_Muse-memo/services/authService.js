export const loginUser = async (credentials) => {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }
    if(res.ok){
        localStorage.setItem("token", data.token);
        return data;
    } else {
        throw new Error(data.error)
    }
  };