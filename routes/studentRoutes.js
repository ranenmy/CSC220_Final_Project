const router = require('express').Router();

const {
    authenticate,
    allowRoles
} = require('../middleware/authMiddleware');

const controller =
    require('../controllers/studentController');

router.use(authenticate);


// =====================================================
// GET ALL STUDENTS
// Advisor only
// =====================================================

router.get(
    '/',
    allowRoles('advisor'),
    controller.getStudents
);


// =====================================================
// GET STUDENT RECORD
// =====================================================

router.get(
    '/:id/record',
    allowRoles('advisor', 'student'),
    controller.getRecord
);


// =====================================================
// GET ELIGIBLE COURSES
// =====================================================

router.get(
    '/:id/eligible',
    allowRoles('advisor'),
    controller.getEligible
);


module.exports = router;