import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { mutate } from "swr";

export default function Form({ forNewData = true, dataForm }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: dataForm.title,
    desc: dataForm.desc,
  });

  const putData = async (form) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/data/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data } = await res.json();
      mutate(`/api/data/${id}`, data, false);
      router.push("/");
    } catch (error) {
      setMessage("Falló la edición");
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log(res);
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("falló crear data");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forNewData ? postData(form) : putData(form);
  };

  return (
    <div className="container">
      <h1 className="my-3">Crear nueva data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          autoComplete="off"
          className="form-control my-2"
        />
        <input
          type="text"
          name="desc"
          placeholder="Descripción"
          value={form.desc}
          onChange={handleChange}
          autoComplete="off"
          className="form-control my-2"
        />
        <button
          type="submit"
          disabled={!form.title || !form.desc}
          className="btn btn-primary w-100"
        >
          {forNewData ? "Agregar" : "Editar"}
        </button>
        <Link href="/">
          <a className="btn btn-warning w-100 my-3">Volver</a>
        </Link>
        <p>{message}</p>
      </form>
    </div>
  );
}
