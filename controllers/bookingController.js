import Booking from "../models/bookingModel.js";



export const createBookings = async(req,res)=>{
 
  
const{userEmail,turfName,turfId,category,date,startingTime,duration} = req.body;

let bookings = await Booking.findOne({userEmail});

if(!bookings){
    bookings = new Booking({userEmail,turfName,turfId,category,date,startingTime,duration})
}else{
    return res.send("already booked")
}


await bookings.save();

//res.status(200).send(bookings)
res.json({message:'booking done',bookings})
}