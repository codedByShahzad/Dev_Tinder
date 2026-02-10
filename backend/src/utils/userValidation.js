import validator from "validator"

export const validateSignUp = (req) =>{

    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password) {
        throw new Error("Please Enter the Required Feilds")
    }

    if (firstName.length<4 || firstName.length> 50 ) {
        throw new Error("First name is not Valid")
    }

    if (lastName.length<3 || lastName.length > 50) {
        throw new Error("Last name is not Valid")
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is not Valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("password is not strong")
    }

}


