import { useEffect, useState } from 'react'

function AdminDashboard() {
  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // =====================================================
  // CREATE USER
  // =====================================================

  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    studentId: '',
    advisorId: '',
    active: true,
  })

  // =====================================================
  // EDIT USER
  // =====================================================

  const [editingUser, setEditingUser] = useState(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  const [editData, setEditData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    advisorId: '',
    active: true,
  })

  // =====================================================
  // GET ALL USERS FROM BACKEND
  // =====================================================

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error(
          'No login token found. Please add a token for testing.'
        )
      }

      const response = await fetch(
        'http://localhost:3001/api/users',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to load users'
        )
      }

      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    fetchUsers()
  }, [])

  // =====================================================
  // CREATE FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // =====================================================
  // CREATE USER
  // =====================================================

  const handleCreateUser = async (event) => {
    event.preventDefault()

    try {
      setSaving(true)
      setFormError('')
      setSuccess('')
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Admin token not found.')
      }

      const newUser = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        active: true,
      }

      // Student ID
      if (formData.role === 'student') {
        newUser.studentId =
          formData.studentId.trim()
      }

      // Advisor ID
      if (formData.role === 'advisor') {
        newUser.advisorId =
          formData.advisorId.trim()
      }

      const response = await fetch(
        'http://localhost:3001/api/users',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(newUser),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to create user'
        )
      }

      setSuccess(
        `${data.name} created successfully.`
      )

      // Reset create form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'student',
        studentId: '',
        advisorId: '',
        active: true,
      })

      setShowForm(false)

      // Reload users
      await fetchUsers()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const handleEditClick = (user) => {
    setEditingUser(user)

    setEditData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      studentId: user.studentId || '',
      advisorId: user.advisorId || '',
      active: user.active,
    })

    setEditError('')
    setSuccess('')
    setError('')

    // Close create form
    setShowForm(false)
  }

  // =====================================================
  // EDIT FORM CHANGE
  // =====================================================

  const handleEditChange = (event) => {
    const { name, value } = event.target

    setEditData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // =====================================================
  // UPDATE USER
  // =====================================================

  const handleUpdateUser = async (event) => {
    event.preventDefault()

    if (!editingUser) {
      return
    }

    try {
      setEditSaving(true)
      setEditError('')
      setSuccess('')
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Admin token not found.')
      }

      const updatedUser = {
        name: editData.name.trim(),
        email: editData.email.trim(),
        active: editData.active,
      }

      // Student
      if (editingUser.role === 'student') {
        updatedUser.studentId =
          editData.studentId.trim()
      }

      // Advisor
      if (editingUser.role === 'advisor') {
        updatedUser.advisorId =
          editData.advisorId.trim()
      }

      // Password is optional
      if (editData.password.trim()) {
        updatedUser.password =
          editData.password
      }

      const response = await fetch(
        `http://localhost:3001/api/users/${editingUser._id}`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(updatedUser),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update user'
        )
      }

      setSuccess(
        `${data.name} updated successfully.`
      )

      setEditingUser(null)

      // Reload users
      await fetchUsers()
    } catch (err) {
      setEditError(err.message)
    } finally {
      setEditSaving(false)
    }
  }

  // =====================================================
  // DELETE / DEACTIVATE USER
  // =====================================================

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    )

    if (!confirmed) {
      return
    }

    try {
      setSuccess('')
      setError('')
      setEditError('')
      setFormError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Admin token not found.')
      }

      const response = await fetch(
        `http://localhost:3001/api/users/${user._id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete user'
        )
      }

      setSuccess(
        `${user.name} deleted successfully.`
      )

      // Close edit form if same user
      if (
        editingUser &&
        editingUser._id === user._id
      ) {
        setEditingUser(null)
      }

      // Reload users
      await fetchUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  // =====================================================
  // ONLY ACTIVE USERS
  // =====================================================

  const activeUsers = users.filter(
    (user) => user.active === true
  )

  // =====================================================
  // ACTIVE USER COUNTS
  // =====================================================

  const activeUserCount = activeUsers.length

  const studentCount = activeUsers.filter(
    (user) => user.role === 'student'
  ).length

  const advisorCount = activeUsers.filter(
    (user) => user.role === 'advisor'
  ).length

  // =====================================================
  // FILTER ACTIVE USERS
  // =====================================================

  const filteredUsers = activeUsers.filter(
    (user) => {
      if (filter === 'all') {
        return true
      }

      return user.role === filter
    }
  )

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-page">
        <h1>Admin Dashboard</h1>
        <p>Loading users...</p>
      </div>
    )
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="admin-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-header">

        <div>

          <h1>Admin Dashboard</h1>

          <p className="subtitle">
            Course Registration Management System
          </p>

        </div>

        <button
          type="button"
          className="add-user-button"
          onClick={() => {
            setShowForm(!showForm)
            setEditingUser(null)
            setFormError('')
            setSuccess('')
            setError('')
          }}
        >
          {showForm
            ? 'Cancel'
            : '+ Add User'}
        </button>

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* =================================================
          CREATE USER FORM
      ================================================= */}

      {showForm && (

        <div className="user-form-card">

          <h2>Create New User</h2>

          {formError && (
            <div className="form-error">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateUser}>

            <div className="form-grid">

              {/* NAME */}

              <div className="form-group">

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  minLength="8"
                  required
                />

              </div>

              {/* ROLE */}

              <div className="form-group">

                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="student">
                    Student
                  </option>

                  <option value="advisor">
                    Advisor
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

              {/* STUDENT ID */}

              {formData.role === 'student' && (

                <div className="form-group">

                  <label>Student ID</label>

                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    required
                  />

                </div>

              )}

              {/* ADVISOR ID */}

              {formData.role === 'advisor' && (

                <div className="form-group">

                  <label>Advisor ID</label>

                  <input
                    type="text"
                    name="advisorId"
                    value={formData.advisorId}
                    onChange={handleChange}
                    placeholder="Enter advisor ID"
                    required
                  />

                </div>

              )}

            </div>

            {/* FORM BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowForm(false)
                  setFormError('')
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-button"
                disabled={saving}
              >
                {saving
                  ? 'Creating...'
                  : 'Create User'}
              </button>

            </div>

          </form>

        </div>

      )}

      {/* =================================================
          EDIT USER FORM
      ================================================= */}

      {editingUser && (

        <div className="user-form-card edit-form-card">

          <div className="edit-form-header">

            <div>

              <h2>Edit User</h2>

              <p>
                Editing {editingUser.name}
              </p>

            </div>

            <span className="role-label">
              {editingUser.role}
            </span>

          </div>

          {editError && (
            <div className="form-error">
              {editError}
            </div>
          )}

          <form onSubmit={handleUpdateUser}>

            <div className="form-grid">

              {/* NAME */}

              <div className="form-group">

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label>New Password</label>

                <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleEditChange}
                  placeholder="Leave blank to keep current password"
                  minLength="8"
                />

              </div>

              {/* ROLE */}

              <div className="form-group">

                <label>Role</label>

                <input
                  type="text"
                  value={editingUser.role}
                  disabled
                />

              </div>

              {/* STUDENT ID */}

              {editingUser.role === 'student' && (

                <div className="form-group">

                  <label>Student ID</label>

                  <input
                    type="text"
                    name="studentId"
                    value={editData.studentId}
                    onChange={handleEditChange}
                    required
                  />

                </div>

              )}

              {/* ADVISOR ID */}

              {editingUser.role === 'advisor' && (

                <div className="form-group">

                  <label>Advisor ID</label>

                  <input
                    type="text"
                    name="advisorId"
                    value={editData.advisorId}
                    onChange={handleEditChange}
                    required
                  />

                </div>

              )}

              {/* STATUS */}

              <div className="form-group">

                <label>Status</label>

                <select
                  value={
                    editData.active
                      ? 'active'
                      : 'inactive'
                  }
                  onChange={(event) =>
                    setEditData((previous) => ({
                      ...previous,

                      active:
                        event.target.value ===
                        'active',
                    }))
                  }
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

            {/* EDIT BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setEditingUser(null)
                  setEditError('')
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-button"
                disabled={editSaving}
              >
                {editSaving
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

            </div>

          </form>

        </div>

      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="summary">

        {/* ALL ACTIVE USERS */}

        <div>

          <h3>All Users</h3>

          <p>
            {activeUserCount}
          </p>

        </div>

        {/* STUDENTS */}

        <div>

          <h3>Students</h3>

          <p>
            {studentCount}
          </p>

        </div>

        {/* ADVISORS */}

        <div>

          <h3>Advisors</h3>

          <p>
            {advisorCount}
          </p>

        </div>

      </div>

      {/* =================================================
          FILTER BUTTONS
      ================================================= */}

      <div className="filter-buttons">

        {/* ALL USERS */}

        <button
          type="button"
          onClick={() => setFilter('all')}
          className={
            filter === 'all'
              ? 'active-filter'
              : ''
          }
        >
          All Users ({activeUserCount})
        </button>

        {/* STUDENTS */}

        <button
          type="button"
          onClick={() =>
            setFilter('student')
          }
          className={
            filter === 'student'
              ? 'active-filter'
              : ''
          }
        >
          Students ({studentCount})
        </button>

        {/* ADVISORS */}

        <button
          type="button"
          onClick={() =>
            setFilter('advisor')
          }
          className={
            filter === 'advisor'
              ? 'active-filter'
              : ''
          }
        >
          Advisors ({advisorCount})
        </button>

      </div>

      {/* =================================================
          TABLE TITLE
      ================================================= */}

      <h2>

        {filter === 'all' &&
          'All Users'}

        {filter === 'student' &&
          'Students'}

        {filter === 'advisor' &&
          'Advisors'}

        {' '}({filteredUsers.length})

      </h2>

      {/* =================================================
          USERS TABLE
      ================================================= */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>
                Student / Advisor ID
              </th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id}>

                {/* NAME */}

                <td>
                  {user.name}
                </td>

                {/* EMAIL */}

                <td>
                  {user.email}
                </td>

                {/* ROLE */}

                <td>
                  {user.role}
                </td>

                {/* ID */}

                <td>

                  {user.studentId ||
                    user.advisorId ||
                    '-'}

                </td>

                {/* STATUS */}

                <td>

                  {user.active
                    ? 'Active'
                    : 'Inactive'}

                </td>

                {/* ACTIONS */}

                <td>

                  <div className="action-buttons">

                    {/* EDIT BUTTON */}

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        handleEditClick(user)
                      }
                    >
                      Edit
                    </button>

                    {/* DELETE BUTTON */}

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDeleteUser(user)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AdminDashboard