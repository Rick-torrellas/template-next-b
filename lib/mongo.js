//@ts-check
/**
 * @module mongo 
 * @description Este es el modulo encargado de conectarse a mongodb, usando mongoose.
 * @requires mongoose
 */
import mongoose from "mongoose";
/**
 * @type {string}
 * @description Es la uri para conectarse con mongodb, es una variablde de entorno llamada 'MONGODB_URI', cargada desde un archivo '.env.local' en la raiz de la aplicacion. 
 * @constant
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Agregue un mongodb uri");
}
/**
 * @type {any}
 * @description La verdad no se que es lo que hace.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
/**
 * 
 * @returns {Promise<any>}
 * @description Es la funcion encargada de conectarse a mongodb, usando la variable {@link MONGODB_URI}.
 */
const mongo = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
export default mongo;
