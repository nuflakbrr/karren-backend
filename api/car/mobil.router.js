const router = require("express").Router()
const { checkToken } = require("../../auth/tokenValidation")
const { controllerAdd, controllerDelete, controllerGet, controllerGetId, controllerUpdate } = require("./mobil.controller")

router.post('/', checkToken, controllerAdd)
router.get('/', controllerGet)
router.get('/id', controllerGetId)
router.patch('/', checkToken, controllerUpdate)
router.delete('/', checkToken, controllerDelete)

module.exports = router 