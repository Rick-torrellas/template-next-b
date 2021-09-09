import mongoose from "mongoose";
const DataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Por favor ingrese título"],
  },
  desc: {
    type: String,
    required: [true, "Por favor ingrese descripción"],
  },
});

export default mongoose.models.Data || mongoose.model("Data", DataSchema);
