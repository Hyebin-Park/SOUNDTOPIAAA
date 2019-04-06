import mongoose from "mongoose";

const TrachSchema = new mongoose.Schema({
    title: String,
    artist: String,
    imgUrl: String,
    trackUrl: String,
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Track = mongoose.model("Track", TrachSchema)

export default Track;