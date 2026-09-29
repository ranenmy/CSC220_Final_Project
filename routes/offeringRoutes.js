const router = require('express').Router();
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const controller = require('../controllers/offeringController');

router.use(authenticate);
router.get('/', allowRoles('advisor', 'student'), controller.getOfferings);
router.post('/', allowRoles('advisor'), controller.createOffering);
router.patch('/:id', allowRoles('advisor'), controller.updateOffering);
router.delete('/:id', allowRoles('advisor'), controller.deleteOffering);

module.exports = router;
