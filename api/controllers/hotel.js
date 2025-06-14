import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)
      try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
      } catch (err) {
        next(err);
      }


}

// UPDATE

export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(200).json(updatedHotel);
      } catch (err) {
        next(err);
      }

}


// DELETE

export const deleteHotel = async (req, res, next) => {

    try {
    await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).json("Hotel has been deleted.");
     } catch (err) {
        next(err);
      }
}


// GET

export const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
      } catch (err) {
        next(err);
      }


}
// GET ALL

// export const getHotels = async (req, res, next) => {

//     try {
//         const hotels = await Hotel.find(req.query).limit(req.query.limit); // You can limit the number of hotels returned by passing a limit in the query parameters
//         // If you want to populate the hotel with user data, you can use:
//         // const hotels = await Hotel.find(req.query).populate("userId");
//         res.status(200).json(hotels);
//       } catch (err) {
//         next(err);
//       }


// }
export const getHotels = async (req, res, next) => {
  const { min, max, limit, featured, ...others } = req.query;

  try {
    const query = {
      ...others,
      cheapestPrice: {
        $gt: parseInt(min) || 1,
        $lt: parseInt(max) || 999,
      },
    };

    // ✅ Convert "featured" query param string to actual boolean
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // 🛠 Optional: log the query being used
    console.log("MongoDB Query:", query);

    const hotels = await Hotel.find(query).limit(parseInt(limit) || 0);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};



// GET COUNT BY CITY
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

// GET COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
      const hotelCount   = await Hotel.countDocuments({ type: "hotel" }); 
      const apartmentCount   = await  Hotel.countDocuments({ type: "apartment" }); 
      const resortCount   =await  Hotel.countDocuments({ type: "resort" }); 
      const villaCount   = await Hotel.countDocuments({ type: "villa" }); 
      const cabinCount   =await  Hotel.countDocuments({ type: "cabin"}); 
        res.status(200).json([
            { type: "hotel", count: await hotelCount },
            { type: "apartment", count: await apartmentCount },
            { type: "resort", count: await resortCount },
            { type: "villa", count: await villaCount },
            { type: "cabin", count: await cabinCount }
        ]);
    } catch (err) {
        next(err);
    }
}

// GET HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id); 
        const list  = await Promise.all(hotel.rooms.map(room => { 
              return Room.findById(room);
    }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}