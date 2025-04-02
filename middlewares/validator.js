import validator from 'validator';

const validateUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (
        !password ||
        !validator.isLength(password, { min: 8 }) ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long and contain at least one letter and one number',
        });
    }

    next();
};

export default validateUser;