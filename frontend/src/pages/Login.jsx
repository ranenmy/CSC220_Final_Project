import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed'
        )
      }

      // Save token
      localStorage.setItem(
        'token',
        data.token
      )

      // Build complete user object
      const loggedInUser = {
        ...data.user,

        id:
          data.user?.id ||
          data.user?._id,

        email:
          data.user?.email ||
          email,
      }

      // Save user information
      localStorage.setItem(
        'user',
        JSON.stringify(loggedInUser)
      )

      // Redirect by role
      if (loggedInUser.role === 'admin') {
        navigate('/admin')

      } else if (
        loggedInUser.role === 'advisor'
      ) {
        navigate('/advisor')

      } else if (
        loggedInUser.role === 'student'
      ) {
        navigate('/student')

      } else {
        setError(
          'Unsupported user role.'
        )
      }

    } catch (err) {
      setError(
        err.message ||
        'Unable to connect to the server.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      {/* HEADER */}

      <header className="login-header">

        <div>
          <h1>
            Course Registration
          </h1>

          <p>
            Course Registration Management System
          </p>
        </div>

      </header>

      {/* LOGIN CONTENT */}

      <main className="login-content">

        <section className="login-card">

          <h2>
            Welcome Back
          </h2>

          <p className="login-subtitle">
            Sign in to access your dashboard
          </p>

          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="login-field">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="username"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

            </div>

            {/* ERROR */}

            {error && (
              <p
                className="login-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? 'Signing in...'
                : 'Login'}
            </button>

          </form>

        </section>

      </main>

    </div>
  )
}

export default Login