import Form from "../components/Form";

export default function New() {
  const dataForm = {
    title: "",
    desc: "",
  };

  return <Form dataForm={dataForm} />;
}
