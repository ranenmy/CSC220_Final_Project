const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message || 'Something went wrong'
    )
  }

  return data
}

export const getOfferings = (term) =>
apiRequest(`/offerings?term=${encodeURIComponent(term)}`)


export const getMyRegistrations = () => {
  return apiRequest('/me/registrations')
}

export const getStudentRecord = (studentId) => {
  return apiRequest(`/students/${studentId}/record`)
}