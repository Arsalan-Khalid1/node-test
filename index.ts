import expres, {Request, Response, Express, NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectToDb } from "./src/config/db";
import authRouter from "./src/app/routes/auth.routes";
import { errorMiddleware } from "./src/app/middlewares/error.middleware";
import bookRouter from "./src/app/routes/book.routes";
import NodeCache from "node-cache";

const app: Express = expres();


export const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

app.use(expres.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/auth", authRouter)
app.use("/api/v1/books", bookRouter);
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(errorMiddleware)



connectToDb();

app.listen(5001, () => {
    console.log("server started at port 5000 ")
})