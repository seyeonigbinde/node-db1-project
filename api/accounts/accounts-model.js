const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts').select('id', 'name', 'budget')
}

const getById = id => {
  const result = await db('accounts')
  .where('id', id).first()
    console.log(result)
    return result
}

const create = account => {
  const [id] = await db('accounts')
    .insert({ account })
  return getById(id)
}

const updateById = (id, account) => {
  return db('accounts')
  .where('id', id)
  .update({ account })
  .then(() => {
    return getById(id)
  })
}

const deleteById = id => {
  const toBeChopped = await getById(id)
  await db('accounts')
    .where({ id })
    .del()

  return toBeChopped
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
