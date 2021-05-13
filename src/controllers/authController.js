const express = require('express');

const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Email already exists' });

        
        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
});

router.post('authenticate', async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
})

module.exports = app => app.use('/auth', router);