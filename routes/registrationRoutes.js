const router = require('express').Router();
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const controller = require('../controllers/registrationController');

router.use(authenticate, allowRoles('advisor'));
router.post('/', controller.createRegistration);
router.delete('/:id', controller.deleteRegistration);

module.exports = router;
