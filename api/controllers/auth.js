import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Register a new user
export const register = async(req, res,next) => {
  
    try {

   const { username, email, password, ...rest } = req.body;

    // 🔐 Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields (username, email, or password)" });
    }


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
         const newUser  = new User({
          ...req.body,
          // username: req.body.username,
            password: hash,    
    });
     await newUser.save();
     res.status(200).send("User has been created");
}
    catch (err) {
        next(err);
    }
} 

//  Login a user
export const login = async(req, res,next) => {
  
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));  
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, isAdmin, ...otherDetails } = user._doc;
        // Set the token as a cookie
        res.cookie("access_token", token,{httpOnly: true}) //does not allow the cookie to be accessed by client-side JavaScript
       // Send the user details and token in the response
        .status(200).json({details: {...otherDetails}, isAdmin});
    }  

    catch (err) {
        next(err);
    }
}