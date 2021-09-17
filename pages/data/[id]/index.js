/**
 * @file
 * @description Contiene un componente que muestra un solo elemento de la base de datos.
 * @requires next/link
 * @requires (useRouter)next/router
 * @requires (useState)react
 * @requires /mongo
 * @requires /Data
 * @see OneData
 */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import mongo from "./../../../lib/mongo";
import Data from "./../../../models/Data";
/**
 * @component
 * @category Pages
 * @param {Object} props
 * @param {Object} props.data 
 */
 function OneData({ data }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const dataId = router.query.id;
    try {
      await fetch(`/api/data/${dataId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      setMessage("Error al eliminar");
    }
  };

  return (
    <div className="container">
      <h1 className="my-2">Detalle:</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title text-uppercase">
            <h5>{data.title}</h5>
          </div>
          <p className="fw-light">{data.desc}</p>
          <Link href="/data/[id]/edit" as={`/data/${data._id}/edit`}>
            <a className="btn btn-warning me-2">Editar</a>
          </Link>
          <Link href="/">
          <a className="btn btn-warning my-3">Volver</a>
        </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await mongo();
    const data = await Data.findById(params.id).lean();
    data._id = data._id.toString();
    return { props: { data } };
  } catch (error) {
    console.log("error", error);
  }
}
export default OneData;