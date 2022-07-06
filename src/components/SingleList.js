import React from "react";
import { useState } from "react";
import axios from "axios";
import "../list.css";

export default function SingleList(props) {
  const [edit, setEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    axios
      .put(`http://localhost:3000/api/list/check/${e.target.parentNode.id}`, {
        checked: !props.checked,
        checked_date: date,
      })
      .then(function (res) {
        console.log(res);
        props.setUpdate(!props.update);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleEditText = (e) => {
    e.preventDefault();
    // console.log(e);
    let newTitle =
      e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1]
        .value;
    let idtoChange = e.target.alt;
    axios
      .put(`http://localhost:3000/api/list/${idtoChange}`, {
        title: newTitle,
      })
      .then(function (res) {
        console.log(res);
        props.setUpdate(!props.update);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(edit);
    setEdit(!edit);
  };

  return (
    <div className="flex flex-row m-4 p-5 border-b-2 border-b-slate-300">
      <div className="flex flex-row basis-4/5" id={props.id2}>
        <div onClick={handleCheck} className="round" id={props.id}>
          <input id={props.checked ? "checked" : "notchecked"} />
        </div>
        {edit ? (
          <input
            className="mx-7 my-0 px-2 py-1 border-2 rounded-3xl border-b-slate-300"
            type="text"
            placeholder={props.title}
          ></input>
        ) : (
          <h1 className={props.checked ? "mx-7 line-through" : "mx-7"}>
            {props.title}
          </h1>
        )}
      </div>
      <div className="flex flex-row basis-1/5">
        {edit ? (
          <div onClick={handleEditText}>
            <img className="w-6 mx-4" src="/images/check.svg" alt={props.id} />
          </div>
        ) : (
          <div onClick={handleEdit}>
            <img className="w-5 mx-4" src="/images/edit.svg" alt={props.id} />
          </div>
        )}
        <div onClick={props.handleDelete}>
          <img className="w-5 mx-4" src="/images/bin.svg" alt={props.id} />
        </div>
      </div>
    </div>
  );
}
