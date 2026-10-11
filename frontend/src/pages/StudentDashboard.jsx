import { useEffect, useState } from 'react'

import {
  getOfferings,
  getMyRegistrations,
  getStudentRecord,
} from '../api'

import Header from '../components/Header'

function StudentDashboard() {

  // USER

  const [user, setUser] = useState(null)

  // STUDENT DATA

  const [offerings, setOfferings] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [academicRecords, setAcademicRecords] = useState([])

  const [term] = useState('2026-1')

  // PAGE STATE

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // INITIAL LOAD

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user')

    if (!storedUser) {
      setError(
        'No student information found.'
      )

      setLoading(false)
      return
    }

    try {

      const parsedUser =
        JSON.parse(storedUser)

      setUser(parsedUser)

      const studentId =
        parsedUser._id ||
        parsedUser.id

      if (!studentId) {
        throw new Error(
          'Student ID not found.'
        )
      }

      loadStudentData(studentId)

    } catch (err) {

      setError(
        err.message ||
        'Invalid user information.'
      )

      setLoading(false)
    }

  }, [])

  // LOAD STUDENT DATA

  const loadStudentData = async (
    studentId
  ) => {

    setLoading(true)
    setError('')

    const results =
      await Promise.allSettled([
        getOfferings(term),
        getMyRegistrations(),
        getStudentRecord(studentId),
      ])

    const [
      offeringsResult,
      registrationsResult,
      recordResult,
    ] = results

    // OFFERINGS

    if (
      offeringsResult.status ===
      'fulfilled'
    ) {

      setOfferings(
        Array.isArray(
          offeringsResult.value
        )
          ? offeringsResult.value
          : []
      )

    } else {

      setOfferings([])

    }

    // REGISTRATIONS

    if (
      registrationsResult.status ===
      'fulfilled'
    ) {

      setRegistrations(
        Array.isArray(
          registrationsResult.value
        )
          ? registrationsResult.value
          : []
      )

    } else {

      setRegistrations([])

    }

    // ACADEMIC RECORD

    if (
      recordResult.status ===
      'fulfilled'
    ) {

      setAcademicRecords(
        Array.isArray(
          recordResult.value
        )
          ? recordResult.value
          : []
      )

    } else {

      setAcademicRecords([])

    }

    // ERRORS

    const errors = results
      .filter(
        result =>
          result.status ===
          'rejected'
      )
      .map(
        result =>
          result.reason?.message ||
          'Failed to load data'
      )

    if (errors.length > 0) {
      setError(
        errors.join(' | ')
      )
    }

    setLoading(false)
  }

  // PASSED GRADES

  const passedGrades = [
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
  ]

  // TOTAL CREDITS EARNED

  const totalCreditsEarned =
    academicRecords
      .filter(record =>
        passedGrades.includes(
          record.grade
        )
      )
      .reduce(
        (total, record) =>
          total +
          (
            record.courseId
              ?.credits || 0
          ),
        0
      )

  // RETAKE COURSES

  const retakeCourses =
    academicRecords.filter(
      record =>
        record.grade === 'F'
    )

  // GROUP RECORDS BY TERM

  const recordsByTerm =
    academicRecords.reduce(
      (groups, record) => {

        const recordTerm =
          record.term ||
          'Unknown Term'

        if (!groups[recordTerm]) {
          groups[recordTerm] = []
        }

        groups[recordTerm].push(
          record
        )

        return groups
      },
      {}
    )

  // LOADING

  if (loading) {

    return (
      <div className="student-page">

        <div className="record-loading">
          Loading student dashboard...
        </div>

      </div>
    )
  }

  // JSX

  return (

    <div className="student-page">

      {/* HEADER */}

      <Header
        title="Student Dashboard"
        userName={
          user?.name ||
          'Student'
        }
        role="Student"
      />

      {/* ERROR */}

      {error && (

        <div className="form-error">
          {error}
        </div>

      )}

      {/* STUDENT INFORMATION */}

      {user && (

        <div className="selected-student-card">

          <div className="selected-student-avatar">

            {user.name
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <span>
              Student
            </span>

            <h3>
              {user.name}
            </h3>

            <p>

              <strong>
                Email:
              </strong>{' '}

              {user.email ||
                'N/A'}

            </p>

            {user.studentId && (

              <p>

                <strong>
                  Student ID:
                </strong>{' '}

                {user.studentId}

              </p>

            )}

          </div>

        </div>

      )}

      {/* SUMMARY */}

      <div className="student-summary">

        <div>

          <h3>
            Available Offerings
          </h3>

          <p>
            {offerings.length}
          </p>

        </div>

        <div>

          <h3>
            Current Registrations
          </h3>

          <p>
            {registrations.length}
          </p>

        </div>

        <div>

          <h3>
            Academic Records
          </h3>

          <p>
            {academicRecords.length}
          </p>

        </div>

        <div>

          <h3>
            Total Credits Earned
          </h3>

          <p>
            {totalCreditsEarned}
          </p>

        </div>

      </div>

      {/* RETAKE ALERT */}

      {retakeCourses.length > 0 && (

        <div className="retake-alert">

          <h3>
            Retake Required
          </h3>

          <p>
            You have{' '}
            {retakeCourses.length}{' '}
            course
            {retakeCourses.length > 1
              ? 's'
              : ''}
            {' '}
            that require a retake.
          </p>

        </div>

      )}

      {/* CURRENT REGISTRATIONS */}

      <div className="academic-record-section">

        <div className="academic-record-header">

          <div>

            <h2>
              Current Registrations
            </h2>

            <p>
              Your currently registered
              courses for term {term}
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

                  <th>
                    Course
                  </th>

                  <th>
                    Term
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Schedule
                  </th>

                  <th>
                    Room
                  </th>

                  <th>
                    Instructor
                  </th>

                  <th>
                    Add / Drop
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {registrations.map(
                  registration => {

                    const offering =
                      registration
                        .offeringId

                    const course =
                      offering
                        ?.courseId

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

                          {
                            offering
                              ?.startTime
                          }

                          {' - '}

                          {
                            offering
                              ?.endTime
                          }

                        </td>

                        <td>

                          {offering?.room ||
                            'N/A'}

                        </td>

                        <td>

                          {
                            offering
                              ?.instructor ||
                            'N/A'
                          }

                        </td>

                        <td>

                          <span
                            className={
                              offering
                                ?.addDropOpen
                                ? 'add-drop-open'
                                : 'add-drop-closed'
                            }
                          >

                            {offering
                              ?.addDropOpen
                              ? 'Open'
                              : 'Closed'}

                          </span>

                        </td>

                        <td>

                          <span className="registered-badge">

                            Registered

                          </span>

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

      {/* ACADEMIC RECORD */}

      <div className="academic-record-section">

        <div className="academic-record-header">

          <div>

            <h2>
              Completed Courses
            </h2>

            <p>
              Previous academic records
              grouped by term
            </p>

          </div>

        </div>

        {academicRecords.length === 0 ? (

          <div className="empty-record-message">

            No academic records found.

          </div>

        ) : (

          Object.entries(
            recordsByTerm
          ).map(
            ([recordTerm, records]) => (

              <div
                className="academic-term-group"
                key={recordTerm}
              >

                <h3 className="academic-term-title">

                  Term {recordTerm}

                </h3>

                <div className="table-container">

                  <table>

                    <thead>

                      <tr>

                        <th>
                          Course
                        </th>

                        <th>
                          Course Title
                        </th>

                        <th>
                          Credits
                        </th>

                        <th>
                          Grade
                        </th>

                        <th>
                          Result
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {records.map(
                        record => (

                          <tr
                            key={
                              record._id
                            }
                          >

                            <td>

                              {
                                record
                                  .courseId
                                  ?.code
                              }

                            </td>

                            <td>

                              {
                                record
                                  .courseId
                                  ?.title
                              }

                            </td>

                            <td>

                              {
                                record
                                  .courseId
                                  ?.credits ??
                                '-'
                              }

                            </td>

                            <td>

                              <span className="grade-badge">

                                {
                                  record
                                    .grade
                                }

                              </span>

                            </td>

                            <td>

                              {record.grade ===
                              'F' ? (

                                <span className="retake-badge">

                                  Retake Required

                                </span>

                              ) : (

                                <span className="passed-badge">

                                  Completed

                                </span>

                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )
          )

        )}

      </div>

      {/* AVAILABLE OFFERINGS */}

      <div className="academic-record-section">

        <div className="academic-record-header">

          <div>

            <h2>
              Available Course Offerings
            </h2>

            <p>
              Courses currently available
              for term {term}
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

                  <th>
                    Course
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Schedule
                  </th>

                  <th>
                    Room
                  </th>

                  <th>
                    Instructor
                  </th>

                  <th>
                    Seats
                  </th>

                  <th>
                    Add / Drop
                  </th>

                </tr>

              </thead>

              <tbody>

                {offerings.map(
                  offering => (

                    <tr
                      key={
                        offering._id
                      }
                    >

                      <td>

                        <strong>

                          {
                            offering
                              .courseId
                              ?.code
                          }

                        </strong>

                        <div>

                          {
                            offering
                              .courseId
                              ?.title
                          }

                        </div>

                      </td>

                      <td>

                        {
                          offering
                            .section
                        }

                      </td>

                      <td>

                        {
                          offering
                            .day
                        }

                        <br />

                        {
                          offering
                            .startTime
                        }

                        {' - '}

                        {
                          offering
                            .endTime
                        }

                      </td>

                      <td>

                        {
                          offering
                            .room
                        }

                      </td>

                      <td>

                        {
                          offering
                            .instructor
                        }

                      </td>

                      <td>

                        {
                          offering
                            .seatsTaken
                        }

                        {' / '}

                        {
                          offering
                            .seats
                        }

                      </td>

                      <td>

                        <span
                          className={
                            offering
                              .addDropOpen
                              ? 'add-drop-open'
                              : 'add-drop-closed'
                          }
                        >

                          {
                            offering
                              .addDropOpen
                              ? 'Open'
                              : 'Closed'
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}

export default StudentDashboard