import express from 'express';

import {createRoom, getRoom, updateRoom, getRooms, deleteRoom, updateRoomAvailability} from '../controllers/room.js';
import { verifyUser,verifyAdmin } from '../utils/VerifyToken.js';

const router = express.Router();    


// create  .......using controller createRoom FUNCTION
// router.post('/:hotelid', verifyAdmin, createRoom);   not using verifyAdmin middleware here as we want to allow admin to create rooms without authentication in development
router.post('/:hotelid', createRoom);

// update
router.put('/:id', verifyAdmin, updateRoom);

router.put('/availability/:id', updateRoomAvailability);
// the id parameter is the room id and we are updating the availability of that room



// delete
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom);

// get
router.get('/:id', getRoom);

// get all
router.get('/', getRooms);


export default router;