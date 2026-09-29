const router = require('express').Router();
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.use(authenticate, allowRoles('admin'));
router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
