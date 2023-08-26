const jwt = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret } = require("../utils/secrets");
const { checkPassword, hashPassword } = require('../utils/passwords');

const users = new Map();

const register = async (req, res) => {
    const { name, phone, password } = req.body;
    users.set(phone,
        {
            name,
            password: await hashPassword(password)
        }
    )

    const accessToken = jwt.sign(phone, accessTokenSecret);
    const refreshToken = jwt.sign(phone, refreshTokenSecret);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.status(200).json({ message: "success" });
}

const login = async (req, res) => {
    const { phone, password } = req.body;
    const user = await users.get(phone);
    console.log(user);
    if (user) {
        try {
            if (await checkPassword(password, user.password)) {
                const accessToken = jwt.sign(phone, accessTokenSecret,{expiresIn:'30s'});
                res.cookie("accessToken", accessToken, { httpOnly: true });
                return res.status(200).json({ message: "success" });
            }
            else {
                return res.status(200).json({ message: "Ivalid credentials!" })
            }
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "Error!" })
        }
    }
    else {
        return res.status(200).json({ message: "User Not Found!" })
    }
}

const me = async (req, res) => {
    const { accessToken } = req.cookies;
    try {
        jwt.verify(accessToken, accessTokenSecret)
        const phone = jwt.decode(accessToken, accessTokenSecret);
        const user = await users.get(phone);
        res.status(200).json({ User: { name: user.name, phone }, message: "success" })
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "error" })
    }
}

const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "success" })
}
module.exports = { register, login, me, logout };