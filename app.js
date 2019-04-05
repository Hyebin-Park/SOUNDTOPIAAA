import express from "express";
import routes from "./BACK/routes";
import golbalRouter from "./BACK/router/globalRouter";
import myPageRouter from "./BACK/router/myPageRouter";


const app = express();

app.use(express.static('FRONT'));

app.use(routes.home, golbalRouter);

app.use(routes.myPage, myPageRouter);

export default app;