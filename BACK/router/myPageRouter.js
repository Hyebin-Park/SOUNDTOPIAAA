import express from "express";
import routes from "../routes";
import CP from "../models/currentPlay"



export const myPageRouter = express.Router();


myPageRouter.get(routes.editProfile, async (req, res) => {
    const what = "profile"
    try{
        const cp = await CP.find({}).populate("currentPlay");
        res.render("userDetail", {what, cp})
    }catch(error){
        console.log(error)
    }

})

myPageRouter.get(routes.like, async (req, res) => {
    try{
        const cp = await CP.find({}).populate("currentPlay");
        res.render("userDetail", {cp})
    }catch(error){
        console.log(error)
    }
})

myPageRouter.get(routes.following, async (req, res) => {
    const what = "following"
    try{
        const cp = await CP.find({}).populate("currentPlay");
        res.render("userDetail", {what,cp})
    }catch(error){
        console.log(error)
    }
})
