import mongoose from "mongoose";

const cpSchema = mongoose.Schema({
    currentPlay: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }   
    
});

const model = mongoose.model("CP", cpSchema);

export default model;