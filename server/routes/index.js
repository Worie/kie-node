const router = require('express').Router();

const zipit = require('./zipit');
router.post('/zipit', zipit.packer);

module.exports = router;
