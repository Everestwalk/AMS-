const express = require('express')
const bcrypt = require('bcrypt')
const omit = require('lodash/omit')

const router = express.Router()
const { User, validate } = require('../models/user')

router.post('/', async (req, res) => {
    const { error, value: userReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { username, password } = req.body

    let user = await User.findOne({ username })
    if (user) return res.status(400).send('User already registered')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ ...userReq, password: hashedPassword })

    await user.save()

    res.send(omit(user.toJSON(), ['__v', 'password']))
})

module.exports = router