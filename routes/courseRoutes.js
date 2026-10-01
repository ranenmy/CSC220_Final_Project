const router = require('express').Router();

const {
    authenticate,
    allowRoles
} = require('../middleware/authMiddleware');

const Course = require('../models/Course');

// All routes require login
router.use(authenticate);

// GET ALL COURSES
// Advisor can use this for the New Offering dropdown
router.get(
    '/',
    allowRoles('advisor'),
    async (req, res, next) => {
        try {
            const courses = await Course
                .find()
                .sort({ code: 1 });

            res.json(courses);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;