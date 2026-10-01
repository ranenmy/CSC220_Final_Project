import { useEffect, useState } from 'react'

function AdvisorDashboard() {

 
  // OFFERINGS
 
  const [term, setTerm] = useState('')
  const [offerings, setOfferings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
 
  // COURSES / CREATE OFFERING
 
  const [courses, setCourses] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [success, setSuccess] = useState('')

  const [newOffering, setNewOffering] = useState({
    courseId: '',
    term: '2026-1',
    section: 1,
    day: 'Monday',
    startTime: '09:00',
    endTime: '11:00',
    room: '',
    instructor: '',
    seats: 30,
    addDropOpen: true,
  })

 
  // EDIT OFFERING
 
  const [editingOffering, setEditingOffering] = useState(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  const [editData, setEditData] = useState({
    section: 1,
    day: 'Monday',
    startTime: '',
    endTime: '',
    room: '',
    instructor: '',
    seats: 1,
    addDropOpen: true,
  })

  const [togglingId, setTogglingId] = useState(null)

 
  // STUDENTS
 
  const [students, setStudents] = useState([])
  const [studentsLoading, setStudentsLoading] = useState(false)
  const [studentError, setStudentError] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  // ACADEMIC RECORD
 
  const [academicRecords, setAcademicRecords] = useState([])
  const [recordLoading, setRecordLoading] = useState(false)
  const [recordError, setRecordError] = useState('')

  // ELIGIBILITY
 
  const [eligibleCourses, setEligibleCourses] = useState([])
  const [eligibleLoading, setEligibleLoading] = useState(false)
  const [eligibleError, setEligibleError] = useState('')

  // REGISTRATION
 
  const [registeringId, setRegisteringId] = useState(null)
  const [registrationError, setRegistrationError] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState('')
 
  // CURRENT REGISTRATIONS
 
  const [registrations, setRegistrations] = useState([])
  const [registrationsLoading, setRegistrationsLoading] = useState(false)
  const [registrationsError, setRegistrationsError] = useState('')
  const [droppingId, setDroppingId] = useState(null)

  // FETCH COURSES
 
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No advisor token found.')
      }
      const response = await fetch(
        'http://localhost:3001/api/courses',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to load courses'
        )
      }

      setCourses(data)

    } catch (err) {

      setCreateError(err.message)

    }
  }

  // FETCH STUDENTS
 
  const fetchStudents = async () => {
    try {
      setStudentsLoading(true)
      setStudentError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No advisor token found.')
      }

      const response = await fetch(
        'http://localhost:3001/api/students',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to load students'
        )
      }

      setStudents(data)

    } catch (err) {

      setStudents([])
      setStudentError(err.message)

    } finally {

      setStudentsLoading(false)

    }
  }

 
  // FETCH ACADEMIC RECORD
 
  const fetchAcademicRecord = async (studentId) => {

    if (!studentId) {
      setAcademicRecords([])
      return
    }

    try {
      setRecordLoading(true)
      setRecordError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No advisor token found.')
      }

      const response = await fetch(
        `http://localhost:3001/api/students/${studentId}/record`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to load academic record'
        )
      }

      setAcademicRecords(data)

    } catch (err) {

      setAcademicRecords([])
      setRecordError(err.message)

    } finally {

      setRecordLoading(false)

    }
  }

 
  // FETCH ELIGIBILITY
 
  const fetchEligibleCourses = async (
    studentId, selectedTerm ) => {
    if (!studentId || !selectedTerm.trim()) {
      setEligibleCourses([])
      return
    }
    try {
      setEligibleLoading(true)
      setEligibleError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No advisor token found.')
      }

      const response = await fetch(
        `http://localhost:3001/api/students/${studentId}/eligible?term=${encodeURIComponent(
          selectedTerm.trim()
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to load eligible courses'
        )
      }

      setEligibleCourses(data)

    } catch (err) {
      setEligibleCourses([])
      setEligibleError(err.message)

    } finally {
      setEligibleLoading(false)

    }
  }

 
  //  FETCH CURRENT REGISTRATIONS
 
  const fetchRegistrations = async (studentId) => {

    if (!studentId) {
      setRegistrations([])
      return
    }

    try {
      setRegistrationsLoading(true)
      setRegistrationsError('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No advisor token found.')
      }

      const response = await fetch(
        `http://localhost:3001/api/registrations/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to load registrations'
        )
      }

      setRegistrations(data)

    } catch (err) {
      setRegistrations([])
      setRegistrationsError(err.message)

    } finally {

      setRegistrationsLoading(false)

    }
  }

  // LOAD OFFERINGS
 
  const loadOfferings = async (termValue) => {
  const cleanTerm = termValue.trim()

    if (!cleanTerm) {
      setError('Please enter a term.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setSearched(true)

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No advisor token found.')
      }

      const response = await fetch(
        `http://localhost:3001/api/offerings?term=${encodeURIComponent(
          cleanTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to load offerings'
        )
      }

      setOfferings(data)

    } catch (err) {

      setOfferings([])
      setError(err.message)

    } finally {

      setLoading(false)

    }
  }

 
  // INITIAL LOAD
 
  useEffect(() => {
    fetchCourses()
    fetchStudents()
  }, [])

 
  // LOAD TERM

  const fetchOfferings = async (event) => {

    event.preventDefault()

    await loadOfferings(term)

    if (selectedStudentId) {
      await fetchEligibleCourses(
        selectedStudentId,
        term
      )
    }
  }

 
  // CREATE OFFERING
 
  const handleOpenCreateForm = () => {

    setEditingOffering(null)

    setNewOffering({
      courseId: '',
      term: term.trim() || '2026-1',
      section: 1,
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      room: '',
      instructor: '',
      seats: 30,
      addDropOpen: true,
    })

    setShowCreateForm(true)
  }

  const handleOfferingChange = (event) => {

    const { name, value } = event.target

    setNewOffering(previous => ({
      ...previous,

      [name]:
        name === 'section' ||
        name === 'seats'
          ? Number(value)
          : name === 'addDropOpen'
            ? value === 'true'
            : value,
    }))
  }

  const handleCreateOffering = async (event) => {
    event.preventDefault()

    try {
      setCreating(true)
      setCreateError('')
      setSuccess('')

      const token = localStorage.getItem('token')
      const body = {
        ...newOffering,
        term: newOffering.term.trim(),
        room: newOffering.room.trim(),
        instructor:
          newOffering.instructor.trim(),
      }

      const response = await fetch(
        'http://localhost:3001/api/offerings',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(body),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to create offering'
        )
      }

      setSuccess(
        'Course offering created successfully.'
      )

      setShowCreateForm(false)
      setTerm(body.term)

      await loadOfferings(body.term)

    } catch (err) {
      setCreateError(err.message)

    } finally {

      setCreating(false)

    }
  }

  // EDIT OFFERING
 
  const handleEditClick = (offering) => {

    setShowCreateForm(false)
    setEditingOffering(offering)

    setEditData({
      section: offering.section,
      day: offering.day,
      startTime: offering.startTime,
      endTime: offering.endTime,
      room: offering.room,
      instructor: offering.instructor,
      seats: offering.seats,
      addDropOpen: offering.addDropOpen,
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleEditChange = (event) => {

    const { name, value } = event.target

    setEditData(previous => ({
      ...previous,

      [name]:
        name === 'section' ||
        name === 'seats'
          ? Number(value)
          : name === 'addDropOpen'
            ? value === 'true'
            : value,
    }))
  }

  const handleUpdateOffering = async (event) => {

    event.preventDefault()

    if (!editingOffering) return

    try {

      setEditSaving(true)
      setEditError('')

      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:3001/api/offerings/${editingOffering._id}`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(editData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to update offering'
        )
      }

      setEditingOffering(null)

      setSuccess(
        'Course offering updated successfully.'
      )

      await loadOfferings(term)

    } catch (err) {

      setEditError(err.message)

    } finally {

      setEditSaving(false)

    }
  }
 
  // DELETE OFFERING
 
  const handleDeleteOffering = async (offering) => {

    const confirmed = window.confirm(
      `Delete ${
        offering.courseId?.code || 'course'
      } Section ${offering.section}?`
    )

    if (!confirmed) return

    try {

      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:3001/api/offerings/${offering._id}`,
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
          data.message ||
          'Failed to delete offering'
        )
      }

      setSuccess(
        'Course offering deleted successfully.'
      )

      await loadOfferings(term)

    } catch (err) {

      setError(err.message)

    }
  }
 
  // ADD DROP OPEN/CLOSE
 
  const handleToggleAddDrop = async (offering) => {

    try {
      setTogglingId(offering._id)

      const token = localStorage.getItem('token')
      const newStatus =
        !offering.addDropOpen

      const response = await fetch(
        `http://localhost:3001/api/offerings/${offering._id}`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            addDropOpen: newStatus,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to update Add/Drop'
        )
      }

      await loadOfferings(term)

    } catch (err) {

      setError(err.message)

    } finally {

      setTogglingId(null)

    }
  }

  // REGISTER STUDENT
 
  const handleRegisterStudent = async (item) => {

    try {
      setRegisteringId(item.offeringId)
      setRegistrationError('')
      setRegistrationSuccess('')

      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:3001/api/registrations',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            studentId: selectedStudentId,
            offeringId: item.offeringId,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to register student'
        )
      }

      setRegistrationSuccess(
        'Student registered successfully.'
      )

      await fetchRegistrations(
        selectedStudentId
      )

      await fetchAcademicRecord(
        selectedStudentId
      )

      await loadOfferings(term)

      await fetchEligibleCourses(
        selectedStudentId,
        term
      )

    } catch (err) {

      setRegistrationError(err.message)

    } finally {

      setRegisteringId(null)

    }
  }

  // DROP REGISTRATION

  const handleDropRegistration = async (registration) => {
    const course =
      registration.offeringId?.courseId
    const confirmed = window.confirm(
      `Are you sure you want to drop ${
        course?.code || 'this course'
      }?`
    )

    if (!confirmed) return

    try {
      setDroppingId(registration._id)
      setRegistrationError('')
      setRegistrationSuccess('')

      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error(
          'No advisor token found.'
        )
      }

      const response = await fetch(
        `http://localhost:3001/api/registrations/${registration._id}`,
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
          data.message ||
          'Failed to drop registration'
        )
      }

      setRegistrationSuccess(
        `${course?.code || 'Course'} dropped successfully.`
      )

      // Refresh registration list
      await fetchRegistrations(
        selectedStudentId
      )

      // Academic Record:
      // IN PROGRESS -> W
      await fetchAcademicRecord(
        selectedStudentId
      )

      // Seats Taken -1
      if (term.trim()) {
        await loadOfferings(term)
      }

      // Recheck eligibility
      if (term.trim()) {
        await fetchEligibleCourses(
          selectedStudentId,
          term
        )
      }

    } catch (err) {

      setRegistrationError(err.message)

    } finally {

      setDroppingId(null)

    }
  }
 
  // SELECT STUDENT
 
  const handleStudentChange = (event) => {
    const studentId =
      event.target.value

    setSelectedStudentId(studentId)
    setRegistrationError('')
    setRegistrationSuccess('')

    if (!studentId) {

      setAcademicRecords([])
      setEligibleCourses([])
      setRegistrations([])

      return
    }

    fetchAcademicRecord(studentId)

    fetchRegistrations(studentId)

    if (term.trim()) {

      fetchEligibleCourses(
        studentId,
        term
      )

    }
  }

  const selectedStudent =
    students.find(
      student =>
        student._id === selectedStudentId
    )
 
  // SUMMARY
  const totalSeats =
    offerings.reduce(
      (total, item) =>
        total + (item.seats || 0),
      0
    )

  const seatsTaken =
    offerings.reduce(
      (total, item) =>
        total + (item.seatsTaken || 0),
      0
    )

  // JSX

  return (

    <div className="advisor-page">

      {/* HEADER */}

      <div className="advisor-header">

        <div>
          <h1>
            Advisor Dashboard
          </h1>

          <p className="subtitle">
            Course Registration Management System
          </p>
        </div>

        <button
          className="new-offering-button"
          onClick={handleOpenCreateForm}
        >
          + New Offering
        </button>

      </div>

      {/* CREATE OFFERING */}

      {showCreateForm && (

        <div className="create-offering-card">

          <div className="create-offering-header">

            <div>
              <h2>Create New Offering</h2>

              <p>
                Add a new course section.
              </p>
            </div>

          </div>

          {createError && (
            <div className="form-error">
              {createError}
            </div>
          )}

          <form onSubmit={handleCreateOffering}>

            <div className="offering-form-grid">

              <div className="form-group">

                <label>Course</label>

                <select
                  name="courseId"
                  value={newOffering.courseId}
                  onChange={handleOfferingChange}
                  required
                >

                  <option value="">
                    Select Course
                  </option>

                  {courses.map(course => (

                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.code}
                      {' — '}
                      {course.title}
                    </option>

                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>Term</label>

                <input
                  name="term"
                  value={newOffering.term}
                  onChange={handleOfferingChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>Section</label>

                <input
                  type="number"
                  min="1"
                  name="section"
                  value={newOffering.section}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>Day</label>

                <select
                  name="day"
                  value={newOffering.day}
                  onChange={handleOfferingChange}
                >

                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>

                </select>

              </div>

              <div className="form-group">

                <label>Start Time</label>

                <input
                  type="time"
                  name="startTime"
                  value={newOffering.startTime}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>End Time</label>

                <input
                  type="time"
                  name="endTime"
                  value={newOffering.endTime}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>Room</label>

                <input
                  name="room"
                  value={newOffering.room}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>Instructor</label>

                <input
                  name="instructor"
                  value={newOffering.instructor}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>Seats</label>

                <input
                  type="number"
                  min="1"
                  name="seats"
                  value={newOffering.seats}
                  onChange={handleOfferingChange}
                />

              </div>

              <div className="form-group">

                <label>Add / Drop</label>

                <select
                  name="addDropOpen"
                  value={String(
                    newOffering.addDropOpen
                  )}
                  onChange={handleOfferingChange}
                >
                  <option value="true">
                    Open
                  </option>

                  <option value="false">
                    Closed
                  </option>
                </select>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setShowCreateForm(false)
                }
              >
                Cancel
              </button>

              <button
                className="create-button"
                disabled={creating}
              >
                {creating
                  ? 'Creating...'
                  : 'Create Offering'}
              </button>

            </div>

          </form>

        </div>

      )}

      {/* EDIT OFFERING */}

      {editingOffering && (

        <div className="create-offering-card edit-offering-card">

          <h2>
            Edit Course Offering
          </h2>

          {editError && (
            <div className="form-error">
              {editError}
            </div>
          )}

          <form onSubmit={handleUpdateOffering}>

            <div className="offering-form-grid">

              <div className="form-group">

                <label>Section</label>

                <input
                  type="number"
                  name="section"
                  value={editData.section}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>Day</label>

                <select
                  name="day"
                  value={editData.day}
                  onChange={handleEditChange}
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>

              </div>

              <div className="form-group">

                <label>Start Time</label>

                <input
                  type="time"
                  name="startTime"
                  value={editData.startTime}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>End Time</label>

                <input
                  type="time"
                  name="endTime"
                  value={editData.endTime}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>Room</label>

                <input
                  name="room"
                  value={editData.room}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>Instructor</label>

                <input
                  name="instructor"
                  value={editData.instructor}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>Seats</label>

                <input
                  type="number"
                  name="seats"
                  value={editData.seats}
                  onChange={handleEditChange}
                />

              </div>

              <div className="form-group">

                <label>Add / Drop</label>

                <select
                  name="addDropOpen"
                  value={String(
                    editData.addDropOpen
                  )}
                  onChange={handleEditChange}
                >
                  <option value="true">
                    Open
                  </option>

                  <option value="false">
                    Closed
                  </option>
                </select>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setEditingOffering(null)
                }
              >
                Cancel
              </button>

              <button
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

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* TERM SEARCH */}

      <div className="term-search-card">

        <form
          className="term-search-form"
          onSubmit={fetchOfferings}
        >

          <div className="term-input-group">

            <label>Term</label>

            <input
              value={term}
              onChange={event =>
                setTerm(event.target.value)
              }
              placeholder="2026-1"
            />

          </div>

          <button
            className="load-button"
            disabled={loading}
          >
            {loading
              ? 'Loading...'
              : 'Load Offerings'}
          </button>

        </form>

      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* SUMMARY */}

      {searched && (

        <div className="advisor-summary">

          <div>
            <h3>Course Offerings</h3>
            <p>{offerings.length}</p>
          </div>

          <div>
            <h3>Total Seats</h3>
            <p>{totalSeats}</p>
          </div>

          <div>
            <h3>Seats Taken</h3>
            <p>{seatsTaken}</p>
          </div>

          <div>
            <h3>Available Seats</h3>
            <p>
              {totalSeats - seatsTaken}
            </p>
          </div>

        </div>

      )}

        {/* OFFERINGS  */}

      {searched && (

        <div>

          <h2>
            Course Offerings
          </h2>

          {offerings.length === 0 ? (

            <div className="empty-message">
              No course offerings found for this term.
            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Section</th>
                    <th>Schedule</th>
                    <th>Room</th>
                    <th>Instructor</th>
                    <th>Seats</th>
                    <th>Add / Drop</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {offerings.map(offering => (

                    <tr key={offering._id}>

                      <td>
                        <strong>
                          {offering.courseId?.code}
                        </strong>

                        <div>
                          {offering.courseId?.title}
                        </div>
                      </td>

                      <td>
                        {offering.section}
                      </td>

                      <td>
                        {offering.day}
                        <br />

                        {offering.startTime}
                        {' - '}
                        {offering.endTime}
                      </td>

                      <td>
                        {offering.room}
                      </td>

                      <td>
                        {offering.instructor}
                      </td>

                      <td>
                        {offering.seatsTaken}
                        {' / '}
                        {offering.seats}
                      </td>

                      <td>

                        <span>
                          {offering.addDropOpen
                            ? 'Open'
                            : 'Closed'}
                        </span>

                        {' '}

                        <button
                          onClick={() =>
                            handleToggleAddDrop(
                              offering
                            )
                          }
                          disabled={
                            togglingId ===
                            offering._id
                          }
                        >
                          {offering.addDropOpen
                            ? 'Close'
                            : 'Open'}
                        </button>

                      </td>

                      <td>

                        <div className="offering-actions">

                          <button
                            className="edit-offering-button"
                            onClick={() =>
                              handleEditClick(
                                offering
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-offering-button"
                            onClick={() =>
                              handleDeleteOffering(
                                offering
                              )
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

          )}

        </div>

      )}

      {/* STUDENT MANAGEMENT */}

      <div className="student-management-section">

        <h2>
          Student Management
        </h2>

        <p>
          Select a student to view academic information
          and manage registration.
        </p>

        {studentError && (
          <div className="form-error">
            {studentError}
          </div>
        )}

        <div className="student-selection-card">

          <div className="student-select-group">

            <label>
              Select Student
            </label>

            <select
              value={selectedStudentId}
              onChange={handleStudentChange}
              disabled={studentsLoading}
            >

              <option value="">
                Choose a student
              </option>

              {students.map(student => (

                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.studentId}
                  {' — '}
                  {student.name}
                </option>

              ))}

            </select>

          </div>

        </div>

        {/* STUDENT INFORMATION */}

        {selectedStudent && (

          <div className="selected-student-card">

            <div className="selected-student-avatar">

              {selectedStudent.name
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <span>
                Selected Student
              </span>

              <h3>
                {selectedStudent.name}
              </h3>

              <p>
                <strong>
                  Student ID:
                </strong>{' '}
                {selectedStudent.studentId}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{' '}
                {selectedStudent.email}
              </p>

            </div>

          </div>

        )}

        {/* CURRENT REGISTRATIONS  */}

        {selectedStudent && (

          <div className="academic-record-section">

            <div className="academic-record-header">

              <div>
                <h2>
                  Current Registrations
                </h2>

                <p>
                  Active registered courses for{' '}
                  {selectedStudent.name}
                </p>
              </div>

            </div>

            {registrationSuccess && (

              <div className="success-message">
                {registrationSuccess}
              </div>

            )}

            {registrationError && (

              <div className="form-error">
                {registrationError}
              </div>

            )}

            {registrationsError && (

              <div className="form-error">
                {registrationsError}
              </div>

            )}

            {registrationsLoading ? (

              <div className="record-loading">
                Loading registrations...
              </div>

            ) : registrations.length === 0 ? (

              <div className="empty-record-message">
                No active registrations.
              </div>

            ) : (

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Course</th>
                      <th>Term</th>
                      <th>Section</th>
                      <th>Schedule</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {registrations.map(
                      registration => {

                        const offering =
                          registration.offeringId

                        const course =
                          offering?.courseId

                        return (

                          <tr
                            key={
                              registration._id
                            }
                          >

                            <td>

                              <strong>
                                {course?.code ||
                                  'Course'}
                              </strong>

                              <div>
                                {course?.title ||
                                  ''}
                              </div>

                            </td>

                            <td>
                              {registration.term}
                            </td>

                            <td>
                              {offering?.section}
                            </td>

                            <td>
                              {offering?.day}
                              <br />

                              {offering?.startTime}
                              {' - '}
                              {offering?.endTime}
                            </td>

                            <td>

                              <span className="registered-badge">
                                Registered
                              </span>

                            </td>

                            <td>

                              <button
                                type="button"
                                className="drop-registration-button"
                                onClick={() =>
                                  handleDropRegistration(
                                    registration
                                  )
                                }
                                disabled={
                                  droppingId ===
                                    registration._id ||
                                  !offering?.addDropOpen
                                }
                              >

                                {droppingId ===
                                registration._id
                                  ? 'Dropping...'
                                  : offering?.addDropOpen
                                    ? 'Drop'
                                    : 'Add/Drop Closed'}

                              </button>

                            </td>

                          </tr>

                        )
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}

        {/* ACADEMIC RECORD */}

        {selectedStudent && (

          <div className="academic-record-section">

            <h2>
              Academic Record
            </h2>

            {recordLoading ? (

              <div className="record-loading">
                Loading academic record...
              </div>

            ) : recordError ? (

              <div className="form-error">
                {recordError}
              </div>

            ) : academicRecords.length === 0 ? (

              <div className="empty-record-message">
                No academic records found.
              </div>

            ) : (

              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Course Title</th>
                      <th>Term</th>
                      <th>Grade</th>
                    </tr>
                  </thead>

                  <tbody>

                    {academicRecords.map(record => (

                      <tr key={record._id}>

                        <td>
                          {record.courseId?.code}
                        </td>

                        <td>
                          {record.courseId?.title}
                        </td>

                        <td>
                          {record.term}
                        </td>

                        <td>

                          <span className="grade-badge">
                            {record.grade}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}

        {/* ELIGIBILITY + REGISTER */}

        {selectedStudent && (

          <div className="academic-record-section eligible-section">

            <div className="academic-record-header">

              <div>

                <h2>
                  Eligible Courses
                </h2>

                <p>
                  Eligibility for{' '}
                  {selectedStudent.name}
                  {term &&
                    ` — Term ${term}`}
                </p>

              </div>

              <button
                className="load-button eligibility-button"
                onClick={() =>
                  fetchEligibleCourses(
                    selectedStudentId,
                    term
                  )
                }
                disabled={
                  eligibleLoading ||
                  !term.trim()
                }
              >

                {eligibleLoading
                  ? 'Checking...'
                  : 'Check Eligibility'}

              </button>

            </div>

            {eligibleError && (

              <div className="form-error">
                {eligibleError}
              </div>

            )}

            {eligibleCourses.length > 0 && (

              <div className="table-container">

                <table>

                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Section</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {eligibleCourses.map(item => {

                      const offering =
                        offerings.find(
                          current =>
                            current._id ===
                            item.offeringId
                        )

                      return (

                        <tr
                          key={
                            item.offeringId
                          }
                        >

                          <td>

                            <strong>
                              {offering?.courseId?.code ||
                                'Course'}
                            </strong>

                            <div>
                              {offering?.courseId?.title}
                            </div>

                          </td>

                          <td>
                            {item.section}
                          </td>

                          <td>

                            <span
                              className={
                                item.eligible
                                  ? 'eligible-badge'
                                  : 'not-eligible-badge'
                              }
                            >

                              {item.eligible
                                ? 'Eligible'
                                : 'Not Eligible'}

                            </span>

                          </td>

                          <td>

                            {item.reasons?.length
                              ? item.reasons.join(', ')
                              : 'All requirements met'}

                          </td>

                          <td>

                            {item.eligible ? (

                              <button
                                className="register-student-button"
                                onClick={() =>
                                  handleRegisterStudent(
                                    item
                                  )
                                }
                                disabled={
                                  registeringId ===
                                  item.offeringId
                                }
                              >

                                {registeringId ===
                                item.offeringId
                                  ? 'Registering...'
                                  : 'Register'}

                              </button>

                            ) : (

                              <span className="cannot-register-text">
                                Not Available
                              </span>

                            )}

                          </td>

                        </tr>

                      )
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  )
}

export default AdvisorDashboard