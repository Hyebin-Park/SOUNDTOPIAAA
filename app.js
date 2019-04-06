import express from "express";
import routes from "./BACK/routes";
import golbalRouter from "./BACK/router/globalRouter";
import myPageRouter from "./BACK/router/myPageRouter";
import { makeDB, mockData, makeArtist, mockArtist } from "./BACK/mockData";


const app = express();

app.use(express.static('FRONT'));
app.use("/MEDIA", express.static('/MEDIA'));

// makeDB(mockData);
// makeArtist(mockArtist);

app.use(routes.home, golbalRouter);

app.use(routes.myPage, myPageRouter);

export default app;