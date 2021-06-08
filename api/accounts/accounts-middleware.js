const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name , budget} = req.body
  if ( !name || !budget ) {
    next({
      message: 'name and budget are required',
      status: 400,
    })
  }
    else if ( typeof name !== 'string') {
      next({
        message: 'name of account must be a string',
        status: 400,
      })
    }
      else if ( name.trim().length >= 3 <= 100) {
        next({
          message: 'name of account must be between 3 and 100',
          status: 400,
        })
      }
        else if ( typeof budget !== 'number') {
          next({
            message: 'budget of account must be a number',
            status: 400,
          })
        }  
          else if ( budget.trim() === -1 || > 1000000) {
            next({
              message: 'name of account must be between 3 and 100',
              status: 400,
            })
  } else {
    req.accounts = { name: req.body.name.trim() }
    req.accounts = { name: req.body.budget.trim() }
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const newName = req.body.name
  if ( name.trim() === newName.trim() ) {
    next({
      message: 'that name is taken',
      status: 400,
    })
  } else {
    req.accounts = { name: req.body.name.trim() }
    next()
  }
}

exports.checkAccountId = (req, res, next) => {
  Accounts.get(req.params.id)
  .then(account => {
    if (!account) {
      res.status(404).json({
        error: `account not found`
      })
    } else {
      req.accounts = account
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}
