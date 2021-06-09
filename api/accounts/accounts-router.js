const router = require('express').Router()

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware');

const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
} catch (err){
    next(err)
}
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, 
checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
    })
    res.status(201).json(newAccount)
  }
  catch(error) {
    next(error)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, 
 async (req, res, next) => {
  const updated = await Account.updateById(req.params.id, req.body)
  res.json(updated)
  try {
    res.json('updated account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
      await Account.deleteById(res.params.id)
      res.json(req.account)
  } catch (err){
    next(err)
}
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


