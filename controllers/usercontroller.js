let router = require('express').Router();

const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/*****************
 * USER - SIGNUP
 ****************/
router.post('/signup', function(req,res){
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })

    .then( user => {

        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            user: user,
            message: "New user has been created.",
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({error :err}))
});

module.exports = router;

router.put('/emailedit', validateSession, function(req,res){
    const updateEmail = {
        email: req.body.email
    };
    const query = {where: { id: req.user.id }};
    UserModel.update(updateEmail, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});
//will return as 0 or 1 (the number of things that have changed.  If you see this, it likely worked.)




