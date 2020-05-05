const fetchFromGraphQL = require('../utils/fetchFromGraphQL')

const updateSinglePermission = require('../graphql/mutations/UpdateSinglePermission.graphql')
const getPermissions = require('../graphql/queries/getPermissions.graphql')

module.exports = function(app) {
  app.post('/api/change-permission', (req, res) => {
    if (req.user) {
      fetchFromGraphQL(updateSinglePermission, {
        tid: req.user.id,
        permissions: req.body.permissions
      }).then(() => {
        res.json({ ok: true })
      })
    } else {
      res.json({ ok: false })
    }
  })

  app.get('/api/get-permissions', (req, res) => {
    if (req.user) {
      fetchFromGraphQL(getPermissions, {
        tid: req.user.id
      }).then(({ data }) => {
        res.json(data.permissions_by_pk)
      })
    } else {
      res.json({ ok: false })
    }
  })
}
