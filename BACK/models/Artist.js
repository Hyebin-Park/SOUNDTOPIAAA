import mongoose from "mongoose";

const ArtistSchema = mongoose.Schema({
    name: String,
    imgUrl:String,
    description : String,
    track:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }
    ],
});

const model = mongoose.model("Artist", ArtistSchema);

export default model;