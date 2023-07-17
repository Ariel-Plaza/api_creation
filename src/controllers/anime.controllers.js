import fs from "fs/promises";
import { v4 as uuid } from "uuid";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pathAnime = path.resolve(__dirname, "../database/anime.json");

const readDB = await fs.readFile(pathAnime, "utf8");

const writeDB = async (data) => {
  try {
    await fs.writeFile(pathAnime, JSON.stringify(data, null, 2), "utf8");
    console.log("File written successfully");
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
};

export const allAnime = async (req, res) => {
  try {
    let data = JSON.parse(readDB);
    console.log(data);
    res.json({ anime: data.anime });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error when reading anime from the DB.",
    });
  }
};

export const findAnimeByID = async (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(readDB);
    let animeFound = data.anime.find((anime) => anime.id == id);
    if (!animeFound)
      return res.status(404).json({
        code: 404,
        message: `An animal with the ID: ${id} does not exist in the database`,
      });
    console.log(animeFound);
    res.json({ animeFound });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: `Error reading animal with ID: ${id}`,
    });
  }
};

export const createAnime = async (req, res) => {
  try {
    let { name, genre, year, author } = req.body;
    let newAnime = {
      id: uuid().slice(0, 4),
      name,
      genre,
      year,
      author,
    };
    let data = JSON.parse(readDB);
    data.anime.push(newAnime);
    writeDB(data);

    res.status(201).json({
      code: 201,
      message: `The animal with ID has been successfully created: ${newAnime.id}`,
      anime: newAnime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error creating new animal",
    });
  }
};

export const deleteAnime = async (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(readDB);
    let index = data.anime.findIndex((anime) => anime.id == id);
    if (index < 0)
      return res.status(404).json({
        code: 404,
        message: "The animal you want to delete is not in the database.",
      });

    let animeRemoved = data.anime.splice(index, 1);
    writeDB(data);

    res.status(200).json({
      code: 200,
      message: `The animal with ID ${id} has been successfully removed`,
      data: animeRemoved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: `Error deleting animal with ID: ${id} `,
    });
  }
};

export const updateAnime = async (req, res) => {
  let { id } = req.params;
  try {
    let { name, genre, year, author } = req.body;
    let data = JSON.parse(readDB);
    let animeSought = data.anime.find((anime) => anime.id == id);

    if (!animeSought)
      return res.status(404).json({
        code: 404,
        message: "The anime you want to modify is not in the database.",
      });

    animeSought.name = name || animeSought.name;
    animeSought.genre = genre || animeSought.genre;
    animeSought.year = year || animeSought.year;
    animeSought.author = author || animeSought.author;
    writeDB(data);

    res.status(201).json({
      code: 201,
      message: `You have successfully modified the anime with ID: ${id}`,
      anime: animeSought,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: `Error modifying anime with ID: ${id} `,
    });
  }
};
