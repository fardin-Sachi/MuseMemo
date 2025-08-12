export default async function getBlogs(username) {
  try {
    const res = await fetch(`http://localhost:8000/api/blogs`, {
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