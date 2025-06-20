import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';


export const createRoom = async (req, res, next) => {  

    const hotelId = req.params.hotelid;   // getting the hotel id from the url
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },   // psuhing the room id to the hotel
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);   // sending the room id and details
    } catch (err) {
        next(err);
    }

}


// update room

export const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(200).json(updatedRoom);
      } catch (err) {
        next(err);
      }

}

// update room availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates, // push the dates to the unavailableDates array
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};


// DELETE

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // getting the hotel id from the url

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, // remove room reference from hotel
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};



// GET

export const getRoom = async (req, res, next) => {

    try {
        const room = await Room.findById(req.params.id);
    
        res.status(200).json(room);
      } catch (err) {
        next(err);
      }


}
// GET ALL

export const getRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
      } catch (err) {
        next(err);
      }


}