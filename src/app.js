import express from "express";

import animeRoutes from "./routes/anime.routes.js"

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES - ENDPOINTS

app.use("/api/v1/anime", animeRoutes);

export default app;