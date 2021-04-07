const Users = require('../models/Users');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    signIn: async (req, res) => {
        let candidate = await Users.findOne({name: req.body.name});
        if (candidate) {
            let password = bcryptJs.compareSync(req.body.password, candidate.password);
            if (password) {
                let token = jwt.sign({
                    name: candidate.name,
                    isAdmin: candidate.admin,
                    _id: candidate._id
                },
                    keys.jwt_key,
                    {expiresIn: '20m'}
                    );
                try{
                    await Users.findByIdAndUpdate(
                        {_id: candidate._id},
                        {$set: candidate},
                        {new: true}
                        );
                    res.status(201).json({
                        token,
                        admin: candidate.admin,
                        id: candidate._id
                    });
                }catch (e) {
                        res.status(500).json({
                            msg: "Something went wrong"
                        });
                }
            } else {
                res.status(401).json({
                    msg: 'Password is wrong'
                });
            }
        } else {
            res.status(404).json({
                msg: 'User didnt find'
            });
        }
    },
    signUp: async (req, res) => {
        let candidate = await Users.findOne({name: req.body.name});
        if (candidate) {
            res.status(401).json({
                msg: 'This name is busy'
            });
        } else {
            const salt = await bcryptJs.genSalt(10);
            const hashPassword = await bcryptJs.hash(req.body.password, salt);

            let newUser = {
                name: req.body.name,
                password: hashPassword,
                admin: false
            };
            try {
                new Users(newUser).save();
                res.status(201).json(newUser);
            } catch (e) {
                res.status(500).json({
                    msg: 'Something went wrong'
                });
            }
        }
    },
    logout: async (req, res) => {
        let candidate = await Users.findOne({token: req.headers.token});
        if (candidate) {
            candidate.token = null;
            await Users.findByIdAndUpdate(
                {_id: candidate._id},
                {$set: candidate},
                {new: true}
            );
            res.status(201).json({
                msg: "Success"
            });
        } else {
            res.status(404).json({
                msg: 'You didnt sigIn'
            });
        }
    }
}
