export default async function getUser(username) {
  try {
    const res = await fetch(`http://localhost:8000/api/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      const errorData = await res.json()
      return {
        errors: {
          username: [errorData.error],
        },
      }
    }

    const data = await res.json()
    
    return data
  } catch (error) {
    console.error("Error fetching data: ",error)
    return null
  }
}