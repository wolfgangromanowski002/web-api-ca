import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  name: { type: String, required: true },
  birthday: { type: String },
  biography: { type: String },
  tmdbId: { type: Number, unique: true }, 
});

export default mongoose.model("Actor", ActorSchema);
