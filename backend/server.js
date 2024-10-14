import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USERNAME +
      ":" +
      process.env.MONGO_PASSWORD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/user", userRouter);
// app.use("/song", songRouter);
// app.use("/playlist", playlistRouter);
// app.use("/oauth", oauthRouter);
// app.use("/export", exportRouter);
// app.use("/import", importRouter);

//running the server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});