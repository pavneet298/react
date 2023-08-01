import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./App.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/posts");
      setTodoList(resp?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTodo = () => {
    navigate("/add-todo");
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:3000/posts/${id}`).then((resp) => {
            if (resp) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              getTodoList();
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleNavigate = (data) => {
    // navigate(`/add-todo?rid=${data?.id}`) //query params
    // navigate(`/edit-todo/${data?.id}`)
    navigate(`/edit-todo?id=${data?.id}`);
    Swal.fire({
      icon: 'edit',
      text: 'Edit data!',
      showCancelButton: true,
      editButtonColor: "#3085d6",
      editButtonText: "Data edited !",
      footer: '<a href="/add-todo"></a>'
    })
  };

  return (
    <Container fluid className="m-2">
      <h1>Todo List</h1>
      {/* <Link to='/add-todo'>Add Todo</Link> */}
      <Button onClick={handleAddTodo}>Add Todo</Button>
      <div className="content">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Index</th>
              <th>Todo </th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList && todoList.length > 0 ? (
              todoList?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data?.task}</td>
                    <td>{data?.description}</td>
                    <td>{data?.status}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          handleNavigate(data);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(data?.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={5}>
                  No Task Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
export default Todo;
