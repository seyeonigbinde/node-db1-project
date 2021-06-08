const router = require('express').Router()

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware');

const Account = require('./accounts-model');

router.get('/', (req, res, next) => {
  Account.get(req.query.length)
  .then(account => {
    res.status(200).json(account);
  })
  .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const postAccount = { ...req.body};
  Account.insert(postAccount)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      next(error)
    });
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, (req, res, next) => {
  Account.update(req.params.id, req.body)
  .then(account => {
    res.status(200).json(account);
  })
  .catch(error => {
    next(error)
  });
});

router.delete('/:id', (req, res, next) => {
  Account.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The account has been nuked' });
  })
  .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log('err handling middleware kicking in!', err.message)
  res.status(err.status || 500).json({
    custom: 'something exploded inside the app',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;


