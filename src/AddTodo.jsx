import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

const AddTodo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('location', location)
  // const {rid} = useParams()
  // // console.log('rid', rid)

  // const {state: data } = location ;

  //query params
  // const id = new URLSearchParams(location?.search).get('rid')
  // console.log('id', id)

  const id = new URLSearchParams(location?.search).get("id");

  const validationSchema = Yup.object().shape({
    task: Yup.string().required("Task is Required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status required"),
  });
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      task: "",
      description: "",
      status: "",
    },
    validationSchema,
    onSubmit: async () => {
      let body = {
        task: values?.task,
        description: values?.description,
        status: values?.status,
      };
      if (id) {
        try {
          const resp = await axios.put(
            `http://localhost:3000/posts/${id}`,
            body
          );
          console.log(resp);
          resetForm();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const resp = await axios.post("http://localhost:3000/posts", body);
          console.log(resp);
          resetForm();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  useEffect(() => {
    // if(data){
    //   setValues({
    //     ...values,
    //     task: data?.task,
    //   description: data?.description,
    //   status: data?.status,
    //   })
    // }
    if (id) {
      getPostDetails();
    }
  }, []);

  const getPostDetails = async () => {
    try {
      const resp = await axios.get(`http://localhost:3000/posts/${id}`);
      if (resp?.status == 200) {
        setValues({
          task: resp?.data?.task,
          description: resp?.data?.description,
          status: resp?.data?.status,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Container fluid>
      <Form className="my-6">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="type"
                placeholder="Task"
                name="task" 
                value={values?.task}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">{touched.task && errors.task}</span>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="type"
                placeholder="Description"
                name="description"
                value={values?.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">
                {touched?.description && errors?.description}
              </span>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={values?.status}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="In-Progress"> In-process</option>
              <option value="Completed">Completed</option>
            </Form.Select>
            <span className="text-danger">
              {touched?.status && errors?.status}
            </span>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Button className="m-2" onClick={handleSubmit}>
            {id ? "Edit" : "Add"}
          </Button>
          <Button className="m-2" onClick={()=>navigate(-1)}>
           Cancel
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddTodo;
