
import express from 'express';
import {getUser, updateUser, getUsers, deleteUser} from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/VerifyToken.js';

const router = express.Router();    


// router.get('/checkauthentication',verifyToken,(req,res,next)=>{
//     res.send("Hello user, you are logged in")
// })

// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//     res.send("Hello user, you are logged in")
// })

// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin, you are logged in and you can delete all accounts")
// })

// update
router.put('/:id',verifyUser,updateUser);

// delete
router.delete('/:id', verifyUser,deleteUser);

// get
router.get('/:id',verifyUser, getUser);

// get all
// router.get('/',verifyAdmin,getUsers);
router.get('/', getUsers);


export default router;