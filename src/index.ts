import express from "express"
import cors from "cors"
import * as dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { appointmentRouter } from "./routes/appointment";

const app = express()


dotenv.config()
const port = 3000;

// Define the CORS options

app.use(cors());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002', 'https://tailor-made-api-production.up.railway.app/']    
    , // replace with your allowed origin
    methods: ['GET', 'POST'], // specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // specify allowed headers
  }));

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb", extended :true }))
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);



app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${process.env.PORT}!`))