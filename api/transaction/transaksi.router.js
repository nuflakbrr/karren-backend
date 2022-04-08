const router = require("express").Router()
const { controllerAdd, controllerDelete, controllerGet, controllerGetId, controllerUpdate } = require("./transaksi.controller")

router.post('/', controllerAdd)
router.get('/', controllerGet)
router.get('/id', controllerGetId)
router.patch('/', controllerUpdate)
router.delete('/', controllerDelete)

module.exports = router