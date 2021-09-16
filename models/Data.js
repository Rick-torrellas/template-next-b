//@ts-check
/**
 * @file
 * @description Va a contener el modelo de datos Data. Un modelo por defecto del template.
 * @requires mongoose
 */
import mongoose from "mongoose";
/**
 * @type {any}
 * @description Contendra el esquema de datos para mongodb, es el esquema por defecto del template.
 * @category Data Models
 * @namespace
 */
const DataSchema = new mongoose.Schema({
  /**
   * @description El titulo de la data.
   * @memberof DataSchema
   */
  title: {
    type: String,
    required: [true, "Por favor ingrese título"],
  },
    /**
   * @description La descripcion de la data.
   * @memberof DataSchema
   */
  desc: {
    type: String,
    required: [true, "Por favor ingrese descripción"],
  },
});

export default mongoose.models.Data || mongoose.model("Data", DataSchema);
