import express from "express";
import routes from "../routes";
import Track from "../models/Track";
import User from "../models/User";
import CP from "../models/currentPlay";
import { makeDB, mockData } from "../mockData";
import app from "../../app";



const globalRouter = express.Router();

// globalRouter.use(express.static('FRONT'));

globalRouter.get(routes.home, (req, res) => {
    res.render("home");
})

globalRouter.get(routes.search, async (req, res) => {
    const {
        query: { search }
    } = req;
    
    try{
        const cp = await CP.find({}).populate("currentPlay");
        res.render("searchResult", { search, cp })
    } catch(error){
        console.log(error)
    }

})

globalRouter.get(routes.main, async (req, res) => {
    try{
        const tracks = await Track.find({});
        const cp = await CP.find({}).populate("currentPlay");
        console.log(cp[0].currentPlay.trackUrl)
        res.render("main", { tracks, cp });
    } catch(error){
        console.log(error)
    }
})

globalRouter.get(routes.myPage, async (req, res) => {
    try{
        const cp = await CP.find({}).populate("currentPlay");
        res.render("userDetail", { cp })
    } catch(error){

    }
})

globalRouter.get(routes.signOut, (req, res) => {
    res.redirect(routes.home)
})

globalRouter.get(routes.songApi(), async (req, res) => {
    const {
        params : { id }
    } = req;

    try{
        const selectedTrack = await Track.findById(id)

        await CP.deleteOne()
        const cp = await new CP({
            currentPlay: selectedTrack.id
        })
        cp.save();
        res.redirect(routes.main)
    } catch(error){
        console.log(error)
    }finally {
        res.end();
    }
})


export default globalRouter;