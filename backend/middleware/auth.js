import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const {token} = req.headers

    //Check Token Available
    if(!token) {
        try {
            return res.json({success:false, message:"Not Authorized Login First"})


        } catch (error) {
            console.log(error)
            res.json({success:false, message:error.message})
        }
    }
    //Get User
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}

export default authUser