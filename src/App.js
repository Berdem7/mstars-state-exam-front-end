import "./App.css";
import SingleList from "./components/SingleList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [update, setUpdate] = useState(true);
  // const [disabled, setDisabled] = useState(false);
  // const [checkednumber, setCheckednumber] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/list").then((res) => {
      const data = res.data;
      setTodoList([...data]);
    });
  }, [update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    axios
      .post(`http://localhost:3000/api/list`, {
        title: e.target[0].value,
        checked: false,
      })
      .then(function (res) {
        console.log(res);
        setUpdate(!update);
      })
      .catch(function (err) {
        console.log(err);
      });
    e.target[0].value = "";
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const idToDelete = e.target.parentNode.childNodes[0].alt;
    axios.delete(`http://localhost:3000/api/list/${idToDelete}`).then((res) => {
      setUpdate(!update);
    });
  };

  // let checkedlists = todoList.filter((e) => e.checked == true);
  // let notcheckedlists = todoList.filter((e) => e.checked == false);
  // console.log(checkedlists);

  return (
    <div className="max-w-4xl m-auto">
      <div className="bg-sky-600 text-white flex justify-between px-6 py-5">
        <h1 className="text-4xl font-semibold">My To Do List</h1>
        <div className="align-bottom">
          <p className="rounded-3xl bg-sky-700 w-fit px-4 py-1 inline m-auto">
            {todoList.filter((e) => e.checked == true).length}/{todoList.length}
          </p>
        </div>
      </div>
      <h3 className="text-2xl bg-sky-200 flex justify-center text-sky-600 w-100 py-4 my-4">
        Not Completed
      </h3>
      {todoList
        .filter((e) => e.checked == false)
        .map((e, i) => {
          return (
            <SingleList
              title={e.title}
              checked={e.checked}
              handleDelete={handleDelete}
              setUpdate={setUpdate}
              update={update}
              id={e._id}
              key={i}
              id2={i}
            />
          );
        })}

      <h3 className=" text-2xl bg-sky-200 flex justify-center text-sky-600 w-100 py-4 my-4">
        Completed
      </h3>
      {todoList
        .filter((e) => e.checked == true)
        .map((e, i) => {
          return (
            <SingleList
              title={e.title}
              checked={e.checked}
              handleDelete={handleDelete}
              setUpdate={setUpdate}
              update={update}
              id={e._id}
              key={i}
              id2={i}
            />
          );
        })}
      <Form className="m-5 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 block" controlId="formTitle">
          <Form.Control
            className="text-md font-semibold border-2 p-3 rounded-3xl w-full"
            type="text"
            placeholder="what's next?"
          />
        </Form.Group>

        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-full leading-none sticky bottom-6 text-end px-5 py-3 text-md font-bold text-white bg-sky-600"
          >
            Add Task
          </button>
        </div>
      </Form>
    </div>
  );
}

export default App;
