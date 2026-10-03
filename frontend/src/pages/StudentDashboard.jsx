import { useEffect, useState } from 'react'
import {
  getOfferings,
  getMyRegistrations,
  getStudentRecord,
} from '../api'
import Header from '../components/Header'

function StudentDashboard() {
  const [user, setUser] = useState(null)

  const [offerings, setOfferings] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [academicRecords, setAcademicRecords] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (!storedUser) {
      setError('No student information found.')
      setLoading(false)
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      loadStudentData(parsedUser.id)
    } catch {
      setError('Invalid user information.')
      setLoading(false)
    }
  }, [])

  const loadStudentData = async (studentId) => {
    try {
      setLoading(true)
      setError('')

      const [
        offeringsData,
        registrationsData,
        recordData,
      ] = await Promise.all([
        getOfferings(),
        getMyRegistrations(),
        getStudentRecord(studentId),
      ])

      setOfferings(offeringsData)
      setRegistrations(registrationsData)
      setAcademicRecords(recordData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="student-page">
        <div className="record-loading">
          Loading student dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="student-page">

      {/* HEADER */}
      <Header
      title="Student Dashboard"
      userName={user?.name || 'Student'}
      role="Student"
      />

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* STUDENT INFORMATION */}
      {user && (
        <div className="selected-student-card">

          <div className="selected-student-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <span>Student</span>

            <h3>{user.name}</h3>

            <p>
              <strong>Email:</strong>{' '}
              {user.email || 'N/A'}
            </p>
          </div>

        </div>
      )}

      {/* SUMMARY */}
      <div className="student-summary">

        <div>
          <h3>Available Offerings</h3>
          <p>{offerings.length}</p>
        </div>

        <div>
          <h3>Current Registrations</h3>
          <p>{registrations.length}</p>
        </div>

        <div>
          <h3>Academic Records</h3>
          <p>{academicRecords.length}</p>
        </div>

      </div>

      {/* CURRENT REGISTRATIONS */}
      <div className="academic-record-section">

        <div className="academic-record-header">
          <div>
            <h2>Current Registrations</h2>

            <p>
              Your currently registered courses
            </p>
          </div>
        </div>

        {registrations.length === 0 ? (

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
                </tr>
              </thead>

              <tbody>

                {registrations.map(registration => {

                  const offering =
                    registration.offeringId

                  const course =
                    offering?.courseId

                  return (
                    <tr key={registration._id}>

                      <td>
                        <strong>
                          {course?.code || 'Course'}
                        </strong>

                        <div>
                          {course?.title || ''}
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

                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* ACADEMIC RECORD */}
      <div className="academic-record-section">

        <h2>Academic Record</h2>

        {academicRecords.length === 0 ? (

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

      {/* AVAILABLE OFFERINGS */}
      <div className="academic-record-section">

        <div className="academic-record-header">
          <div>
            <h2>Available Course Offerings</h2>

            <p>
              Courses currently available in the system
            </p>
          </div>
        </div>

        {offerings.length === 0 ? (

          <div className="empty-message">
            No course offerings found.
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
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  )
}

export default StudentDashboard