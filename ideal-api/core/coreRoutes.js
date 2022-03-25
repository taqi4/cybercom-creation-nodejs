var modelToUse = "User";const express = require('express');
var router = new express.Router();
var User = db[modelToUse];
const {
    v4: uuidv4
} = require('uuid');
var dayjs = require("dayjs");



const refreshToken = async (req, res) => {
    try {
        let user_key = req.params.user_key;
        console.log(user_key);
        let valid_key = await User.findOne({
            where: {
                user_key: user_key,
                refresh_token: req.cookies["refresh-token"]
            }
        });
        console.log(valid_key);

        var decoded = await jwt.verify(req.cookies["refresh-token"], process.env.REFRESH_TOKEN_KEY);
        if (decoded) {
            var userExist = decoded;
            var accessToken = await jwt.sign({
                userName: userExist.userName,
                role: userExist.role
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: 3600
            });
            var refreshToken = await jwt.sign({
                userName: userExist.userName,
                role: userExist.role
            }, process.env.REFRESH_TOKEN_KEY, {
                expiresIn: 86400
            })
            let key = uuidv4();

            await User.update({
                refresh_token: refreshToken,
                user_key: key
            }, {
                where: {
                    id: valid_key.id
                }
            });
            res.cookie("refresh-token", refreshToken, {
                secure: process.env.NODE_ENV !== "development",
                httpOnly: true,
                expires: dayjs().add(30, "days").toDate(),
            });
            res.status(200).send({
                accessToken,
                user_key: key
            });
            return true;
        }
        res.status(403).send("please login first");
        return false;
    } catch (e) {
        console.log(e.message);
    }
}
const loginService = async (user) => {

    let userExist = await User.findOne({
        where: {
            userName: user.userName
        },
        raw: true
    });
    
    if (userExist.password == user.password) {
        var accessToken = await jwt.sign({
            userName: userExist.userName,
            role: userExist.role
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: 3600
        });
        var refreshToken = await jwt.sign({
            userName: userExist.userName,
            role: userExist.role
        }, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: 86400
        });
        let key = uuidv4();

        await User.update({
            refresh_token: refreshToken,
            user_key: key
        }, {
            where: {
                id: userExist.id
            }
        });;
        return {
            accessToken,
            refreshToken,
            key
        };
    } else {
        return false;
    }
}
const login = async (req, res) => {

    var tokens = await loginService(req.body);
    if (tokens) {
        res.cookie("refresh-token", tokens.refreshToken, {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            expires: dayjs().add(30, "days").toDate(),
        });
        console.log(tokens);
        res.status(200).send({
            accessToken: tokens.accessToken,
            user_key: tokens.key
        });
    } else {
        res.status(400).send("invalid login credentials");
    }
}

router.post("/login", login);
router.get("/refresh-token/:user_key", refreshToken);

module.exports = router;