import express from "express";
import routes from "../routes";
import app from "../../app";



const globalRouter = express.Router();

// globalRouter.use(express.static('FRONT'));

globalRouter.get(routes.search, (req, res) => {
    const {
        query: { search }
    } = req;
    res.sendfile("FRONT/views/searchResult.html")
    res.send(search);
})

globalRouter.get(routes.main, (req, res) => {
    res.sendfile("FRONT/views/main.html");
})

globalRouter.get(routes.myPage, (req, res) => {
    res.sendfile("FRONT/views/userDetail.html");
})

globalRouter.get(routes.signOut, (req, res) => {
    res.redirect(routes.home)
})

export default globalRouter;