import express from "express";
import asyncHandler from "express-async-handler";
import Actor from "./actorModel";
import authenticate from "../../authenticate";

const router = express.Router();
router.get("/", asyncHandler(async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json({ success: true, data: actors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Failed to get actors." });
}}));
router.get("/:id", asyncHandler(async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ success: false, msg: "Actor not found" });}
      
    res.status(200).json({ success: true, data: actor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Failed to get actor." });
}}));

router.post("/", authenticate, asyncHandler(async (req, res) => {
  try {
    const { name, birthday, biography, tmdbId } = req.body;
    const newActor = new Actor({ name, birthday, biography, tmdbId });
    
    await newActor.save();
    res.status(201).json({ success: true, data: newActor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Failed to create actor." });
}}));

export default router;
