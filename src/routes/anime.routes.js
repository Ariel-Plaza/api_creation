import { Router } from "express";
import {
  allAnime,
  findAnimeByID,
  createAnime,
  deleteAnime,
  updateAnime,
} from "../controllers/anime.controllers.js";

const router = Router();

//Check all anime
router.get("/", allAnime);

//Check anime for ID
router.get("/:id", findAnimeByID);

//Create Anime
router.post("/", createAnime);

//Delete anime for id
router.delete("/:id", deleteAnime);

//Update anime
router.put("/:id", updateAnime);


export default router;
