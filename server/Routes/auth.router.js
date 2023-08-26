const router = require('express').Router();
const {login, register, me, logout} = require('../Controllers/auth.controller')

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/me", me);
router.delete("/auth/logout", logout)

module.exports = router; 
