const router = require('express').Router();
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const controller = require('../controllers/studentController');

router.use(authenticate);
router.get('/:id/record', allowRoles('advisor', 'student'), controller.getRecord);
router.get('/:id/eligible', allowRoles('advisor'), controller.getEligible);

module.exports = router;
