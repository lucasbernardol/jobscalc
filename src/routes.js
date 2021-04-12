const { Router } = require('express');

const JobController = require('./controllers/JobController');
const ProfileControler = require('./controllers/ProfileController');
const DashBoardController = require('./controllers/DashboardController');

const router = Router();

/**
 * Dashboard routes
 */

router.get('/', DashBoardController.index);

/**
 * Jobs routes
 */

router.get('/job', JobController.index);
router.post('/job', JobController.create);

router.get('/job/:id', JobController.show);
router.post('/job/:id', JobController.update);

router.post('/job/delete/:id', JobController.delete);

/**
 * Profile routes
 */

router.get('/profile', ProfileControler.index);
router.post('/profile', ProfileControler.update);

module.exports = router;
