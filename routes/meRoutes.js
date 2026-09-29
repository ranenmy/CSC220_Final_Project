const router = require('express').Router();
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const controller = require('../controllers/registrationController');

router.use(authenticate, allowRoles('student'));
router.get('/registrations', controller.getMyRegistrations);

module.exports = router;
