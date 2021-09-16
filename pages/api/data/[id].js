//@ts-check
/**
 * @file 
 * @description La entrada de la api, para gestionar una data en la base de datos.
 * @requires /mongo 
 * @requires /Data 
 */
import mongo from "../../../lib/mongo";
import Data from "../../../models/Data";
/**
 * @alias /api/data/:id
 * @category API
 * @description Esta funcion se encarga gestionar la informacion de la cooleccion, usando el parametro id.
 * @param {Object} res 
 * @param {object} req 
 * @returns {Promise<any>}
 * @namespace
 */
export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await mongo();

  switch (method) {
/**
 * @name findDataById
 * @category API
 * @description Va a econtrar solo una coleccion con el id espesificado.
 * @path {GET} /api/data/:id
 * @params {string} :id el campo id es un campo unico generado por mongodb.
 * @response {Object} data Es la coleccion encontrada..
 * @code {200} Cuando el proceso es exitoso, y la data es enviada.
 * @code {400} Si 'data' no fue definida.
 * @code {400} En caso de encontrar algun error.
 * @see {@link DataSchema} Para mas informacion sobre el estructura de 'data'.  
 * @memberof /api/data/:id
 * 
 */
    case "GET":
      try {
        const data = await Data.findById(id);

        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
/**
 * @name findDataByIdAndUpdate
 * @category API
 * @description Va a encontrar una sola coleccion usando el id que se mando por parametro, y luego se va a actualizar con la informacion que se mando en el body. Usando esa informacion para mandarlo a la base de datos.
 * @path {PUT} /api/data/:id
 * @params {string} :id el campo id es un campo unico generado por mongodb.
 * @body {string} _id El id unico de cada coleccion 'data'.
 * @body {string} title El titulo de la coleccion.
 * @body {string} desc La descripcion de la coleccion.
 * @response {Object} data Las colecciones que seran editadas.
 * @code {200} Cuando el proceso es exitoso y se envia la data para editarse.
 * @code {400} Si 'data' no fue definida.
 * @code {400} En caso de encontrar algun error.
 * @see {@link DataSchema} Para mas informacion sobre el estructura de 'data'.  
 * @memberof /api/data/:id
 */
    case "PUT":
      try {
        const data = await Data.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
/**
 * @name deleteData
 * @category API
 * @description Se va a buscar una coleccion usando el id mandado por los parametros y se va a eliminar dicha coleccion.
 * @path {DELETE} /api/data/:id
 * @params {string} :id el campo id es un campo unico generado por mongodb.
 * @code {200} Cuando el proceso es exitoso y la coleccion fue eliminada.
 * @code {400} Si 'data' no fue definida.
 * @code {400} En caso de encontrar algun error.
 * @see {@link DataSchema} Para mas informacion sobre el estructura de 'data'.  
 * @memberof /api/data/:id
 */
    case "DELETE":
      try {
        const data = await Data.deleteOne({ _id: id });
        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
