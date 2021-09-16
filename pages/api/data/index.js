//@ts-check
/**
 * @file 
 * @description El archivo principal para la entrada data en la api.
 * @requires /mongo 
 * @requires /Data 
 */
import mongo from "../../../lib/mongo";
import Data from "../../../models/Data";
/**
 * @alias /api/data
 * @category API
 * @description Esta funcion se encarga gestionar la informacion de la cooleccion, usando el parametro id. Mas que nada recibir y manadar datos.
 * @param {Object} res 
 * @param {object} req 
 * @returns {Promise<any>}
 * @namespace
 */
export default async function handler(req, res) {
  const { method } = req;
  await mongo();

  switch (method) 
  {
/**
 * @name getData
 * @category API
 * @description Va a encontrar todas las colecciones de la tabla.
 * @path {GET} /api/data
 * @response {Object} data Son las solecciones de la tabla data.
 * @code {200} Cuando el proceso es exitoso, y las colecciones son recibidas.
 * @code {400} En caso de encontrar algun error.
 * @see {@link DataSchema} Para mas informacion sobre el estructura de 'data'.  
 * @memberof /api/data
 * :
 */
    case "GET":
      try {
        const data = await Data.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
/**
 * @name enviarData
 * @category API
 * @description Va a crear una nueva coleccion.
 * @path {POST} /api/data
 * @response {Object} Con la nueva coleccion.
 * @code {200} Cuando el proceso es exitoso, y la data es enviada.
 * @code {400} En caso de encontrar algun error.
 * @see {@link DataSchema} Para mas informacion sobre el estructura de 'data'.  
 * @memberof /api/data
 * 
 */
    case "POST":
      try {
        const data = await Data.create(req.body);
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
