const users = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// user registration
exports.registerController = async (req, res) => {
    console.log('Inside register Controller');
    console.log(req.body);
    const { id, firstName, lastName, eMail, password, phoneNumber } = req.body
    console.log(id, firstName, lastName, eMail, password, phoneNumber);
    try {
        const existingUser = await users.findOne({ id, eMail })
        if (existingUser) {
            res.status(406).json("You are already registered!!!")
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            // console.log(hashPassword);
            const newUser = new users({
                id, firstName, lastName, eMail, password: hashPassword, phoneNumber
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error);

    }
}

// user Login
exports.loginController = async (req, res) => {
    console.log("inside login Controller");
    const { eMail, password } = req.body
    // console.log(eMail, password);
    try {
        existingUser = await users.findOne({ eMail })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser.id }, process.env.JWTPASSWORD)
            // console.log(token);
            // console.log(password);
            // console.log(existingUser.password);
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            // console.log(isMatch);
            if (isMatch) {
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(404).json("Incorrect Password")
            }
        } else {
            res.status(404).json("Incorrect Email/Password!!!")
        }
    } catch (error) {
        console.log(error);
    }
}

// user list view
exports.userViewController = async (req, res) => {
    console.log("inside viewController");
    try {
        const allUser = await users.find()
        // console.log(allUser);


        res.status(200).json(allUser.map(user => ({ firstName: user.firstName, email: user.eMail })));


    } catch (error) {
        console.log(error);

    }
}

// userDeatils view
exports.userDetailViewController = async (req, res) => {
    console.log("inside userDetailViewController");
    const eMail = req.body.eMail

    try {
        const userDetails = await users.find({ eMail })
        // console.log(userDetails);

        if (userDetails) {
            res.status(200).json(userDetails.map(detail => ({ firstName: detail.firstName, lastName: detail.lastName, eMail: detail.eMail, phoneNumber: detail.phoneNumber })))
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        console.log(error);

    }

}