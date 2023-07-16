import express from "express";

import animeRoutes from "./routes/anime.routes.js"

const app = express();

//ROUTES - ENDPOINTS

app.use("/api/v1/anime", animeRoutes);

export default app;