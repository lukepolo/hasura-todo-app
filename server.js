import express from "express";
import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use(apiRoutes);
app.use(authRoutes);

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
