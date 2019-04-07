import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    ],
    currentPlay: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }   
    
});

const model = mongoose.model("User", UserSchema);

export default model;