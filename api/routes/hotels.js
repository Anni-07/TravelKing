import express from 'express';

import {createHotel, getHotel, updateHotel, getHotels,  deleteHotel, countByCity, countByType, getHotelRooms} from '../controllers/hotel.js';
import { verifyUser,verifyAdmin } from '../utils/VerifyToken.js';

import createError from 'http-errors';
import { get } from 'mongoose';


const router = express.Router();   

// create  .......using controller createHotel FUNCTION
// router.post('/', verifyAdmin,createHotel); 
router.post('/',createHotel); 


// update
router.put('/:id', verifyAdmin, updateHotel);

// delete
router.delete('/:id', deleteHotel);

// get
router.get('/find/:id', getHotel);

// get all
router.get('/', getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);
//  the id parameter is the hotel id and we are getting the rooms of that hotel





export default router;