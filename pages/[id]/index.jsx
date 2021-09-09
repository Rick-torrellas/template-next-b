import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import mongo from "../../db/mongo";
import Data from "../../models/Data";

export default function Index({ data }) {
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
          <Link href="/[id]/edit" as={`/${data._id}/edit`}>
            <a className="btn btn-warning me-2">Editar</a>
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
    // https://mongoosejs.com/docs/tutorials/lean.html
    const data = await Data.findById(params.id).lean();
    data._id = data._id.toString();
    return { props: { data } };
  } catch (error) {
    console.log("error", error);
  }
}
