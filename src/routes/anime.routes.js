import { Router } from "express";
const router = Router();


router.get("/", (req, res) => {
   res.send("lista de todos los anime");
});

// router.get("/:id",)



export default router;
