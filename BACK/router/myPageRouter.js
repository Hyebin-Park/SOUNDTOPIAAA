import express from "express";
import routes from "../routes";



export const myPageRouter = express.Router();


myPageRouter.get(routes.editProfile, (req, res) => {
    const what = "profile"
    express.static("FRONT")
    res.render("userDetail", {what})
})

myPageRouter.get(routes.like, (req, res) => {
    res.render("userDetail")
})

myPageRouter.get(routes.following, (req, res) => {
    const what = "following"
    res.render("userDetail", {what})
})
