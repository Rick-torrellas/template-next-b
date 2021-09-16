/**
 * @file
 * @description Renderiza el componente formulario.
 * @requires /Form
 * @see {@link New} 
 */
import Form from "../components/Form";
/**
 * @component
 * @category Pages
 * @description Va a renderizar el componente del forlumario, el cual trae toda la logistica para conectarse a la base de datos {@link Form}.
 */
function New() {
  const dataForm = {
    title: "",
    desc: "",
  };
  return <Form dataForm={dataForm} />;
}
export default New;