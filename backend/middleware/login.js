const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({
                success: false,
                message: "Not logged in"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = login;