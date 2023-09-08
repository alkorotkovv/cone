const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const {
  computeCone,
} = require('../controllers/cone');

router.post('/cone', computeCone);

router.use((req, res, next) => {
  next(new NotFoundError('Такого роута не существует'));
});

module.exports = router;
