import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import router from "./index.routes";

dotenv.config();

const parsed = new URL(process.env.API_URL || 'http://localhost:8000');
const port = parseInt(parsed.port || '8000', 10);
const hostname = parsed.hostname || 'localhost';

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Play Futsal API");
});

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())
app.use("/api/v1", router);

app.listen(port, hostname, () => {
    console.log(`Server running on ${process.env.API_URL || 'http://localhost:8000'}`);
});
