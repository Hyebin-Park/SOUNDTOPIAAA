import express from "express";
import routes from "../routes";
// import routes from "..routes"

const myPageRouter = express.Router();

myPageRouter.get(routes.editProfile, (req, res) => {
    res.sendfile("FRONT/views/editProfile.html")
})
myPageRouter.get(routes.like, (req, res) => {
    res.sendfile("FRONT/views/like.html")
})

myPageRouter.get(routes.following, (req, res) => {
    res.sendfile("FRONT/views/following.html")
})

export default myPageRouter;