import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        if (!token) {
            return res.status(401).json({ code: 401, status: false, message: "Unauthorized" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ code: 403, status: false, message: "Forbidden" });
            }
    
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.json({code: 500, status: false, message: "Internal server error"});
    }
}

export default auth;