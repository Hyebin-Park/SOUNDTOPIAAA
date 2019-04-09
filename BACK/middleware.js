import routes from "./routes";
import Artist from "./models/Artist";
import Track from "./models/Track";

export const localsMiddleware = (req, res, next) => {
    res.locals.routes = routes;
    next();
}

// export const searchBar = async (req, res, next) => {
//     const S_artist = await Artist.find({})
//     const S_track = await Track.find({})
//     const SA_result = [];
//     const ST_result = [];

//     for(const object of S_artist) SA_result.push(object);
//     for(const object of S_track) ST_result.push(object);
    
//     console.log(SA_result);
//     try{
//         res.send(SA_result, {
//             'Content-type': 'application/json'
//         })
//         res.send(ST_result, {
//             'Content-type': 'application/json'
//         })
//     } catch(error){
//         console.log(error)
//     }
//     next();
// }