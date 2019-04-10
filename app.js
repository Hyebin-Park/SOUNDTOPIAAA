import express from "express";
import { localsMiddleware } from "./BACK/middleware";
import golbalRouter from "./BACK/router/globalRouter";
import { myPageRouter } from "./BACK/router/myPageRouter";
import routes from "./BACK/routes";
import { makeDB, mockData, makeArtist, mockArtist } from "./BACK/mockData";


const app = express();


app.use(express.static('FRONT'));
app.use("/MEDIA", express.static('/MEDIA'));

app.set('view engine', "pug");

app.use(localsMiddleware)

app.use(routes.home, golbalRouter);

app.use(routes.myPage, myPageRouter);



export default app;