import validator from 'validator';

const emailValidate = (req, res, next) => {
    const { email } = req.body;
    
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next();
}

export default emailValidate;