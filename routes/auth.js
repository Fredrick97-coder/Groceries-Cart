const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC,
    ).toString(),
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).send(savedUser)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC,
    )
    const password = hashPassword.toString(CryptoJS.enc.Utf8)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
