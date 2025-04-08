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

const emailValidate = (req, res, next) => {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next();
}

const recoverPassValidator = ( req, res, next ) => {
    const { email, code, password } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!code) {
        return res.status(400).json({error: 'Code is required'});
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
}

const changePasswordValidator = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if(!oldPassword){
        return res.status(400).json({ error: 'Old password is required' });
    }
    if(!newPassword){
        return res.status(400).json({ error: 'New password is required' });
    }

    if (
        !newPassword ||
        !validator.isLength(newPassword, { min: 8 }) ||
        !/[a-zA-Z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword)
    ) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long and contain at least one letter and one number',
        });
    }

    next();
}

export { validateUser, emailValidate, recoverPassValidator, changePasswordValidator };