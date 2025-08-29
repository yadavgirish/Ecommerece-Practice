import userModel from "../models/userModel.js"
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success:false, message: "User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) {
            const token = createToken(user._id)
            res.json({success:true, message: "User Logged in Successfully",token})
        }
        else {
            res.json({success:false, message: "Invlaid Password"})
        }


    } catch (error) {
        res.json({success:false, message:err.message})
    }
}

const registerUser = async (req, res) => {

    try {

        const {name, email, password} = req.body


        //Checking User Exists or NOt
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false, message:"User already exists"})
        }


        //Cheking Valid Email and Strong password
        if(!validator.isEmail(email)) {
            res.json({success:false, message: "Please enter a Valid Email"})
        }
        if(password.length < 8) {
            res.json({success:false, message: "Please enter a Strong Password"})
        }

        //Hashing Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token, message: "User Created Successfully"})


    } catch(error) {
        res.json({success:false, message:error.message})
    }

}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY)
            res.json({success:true, message: "Admin Logged In", token})
        }
        else {
        res.json({success:false, message: "Invalid Credentials"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}



// import userModel from "../models/userModel.js"
// import validator from "validator"
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"


// const createToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET_KEY)
// }

// const loginUser = async (req, res) => {

// }

// const registerUser = async (req, res) => {

//     try {
        
//         const {name, email, password} = req.body

//         //Check User Exists or Not
//         const exists = await userModel.findOne({email})
//         if(exists) {
//             return res.json({success:false, message:"user already exists"})
//         }

//         //Validate Email and Strong Password
//         if(!validator.isEmail(email)) {
//             return res.json({success:false, message:"Please enter a Valid Email"})
//         }
//         if(password.length < 8) {
//             return res.json({success:false, message:"Please Enter a Strong Password"})
//         }


//         //Hashing user Password
//         const salt  = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         })

//         const user = await newUser.save()
//         const token = createToken(user._id)
//         res.json({success:true, token})


//     } catch(error) {
//         res.json({success:false, message:error.message})
//     }

// }

// const adminLogin = async (req, res) => {

// }

// export {loginUser, registerUser, adminLogin}