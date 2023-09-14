import { Form, Button, Stack, Container, Row, Col } from 'react-bootstrap';
import { useParams} from "react-router-dom";
import React, { useState } from 'react';
import Navigationbar from '../Navbar';
import Toaster from '../Toaster';
import Layout from '../Layouts';
import axiosService from '../../helpers/axios';


function ChangePassword() {


    const { user_email } = useParams();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [ toaster, setToaster ] = useState({
        title: "",
        show: false,
        message: "",
        type: "",
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        const resetForm = event.currentTarget;
        if (resetForm.checkValidity() === false) {
            event.stopPropagation();
        }

        if (form.new_password !== form.confirm_password) {
            setError("Passwords do not match");
            event.stopPropagation();
            return
        }

        const data = {
            email: user_email,
            old_password: form.old_password,
            new_password: form.new_password,
        };

        axiosService.post("https://postgram.hamzabakkour.se/api/change_password/", data)
        .then(() => {
            setToaster({
                type: "success",
                message: "Password reset sucess",
                show: true,
                title: "Success",
            });
            setValidated(true);
            setForm({});
        })
        .catch((err) => {
            if (err.message) {
                setError(err.request.response);
            }
        });
    }



    return (
        <Layout hasNavigationBack>



        <Container className=' my-2'>
            <Row>
            <Col md={3}></Col>

            <Form
            className='border p-4 rounded shadow-sm col-6'
            noValidate
            validated = {validated}
            onSubmit = {handleSubmit}
            >
                <h5 className='text-primary'>Change Password</h5>
                <hr />
                <Stack className='pt-3' gap={1}>
                <Form.Group className='mb-3'>
                    <Form.Control
                    value={form.old_password}
                    onChange={e =>
                        setForm({ ...form, old_password: e.target.value })
                    }
                    required
                    type='password'
                    placeholder='Enter current password'
                    />
                    <Form.Control.Feedback type='invalid'>
                    This file is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 d-flex flex-column'>
                    <Form.Control
                    value={form.new_password}
                    onChange={e =>
                        setForm({ ...form, new_password: e.target.value })
                    }
                    required
                    type='password'
                    placeholder='Enter the new password'
                    />
                    <Form.Control.Feedback type='invalid'>
                    This file is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3 d-flex flex-column'>
                    <Form.Control
                    value={form.confirm_password}
                    onChange={e =>
                        setForm({ ...form, confirm_password: e.target.value })
                    }
                    required
                    type='password'
                    placeholder='Repeat the new password'
                    />
                    <Form.Control.Feedback type='invalid'>
                    This file is required.
                    </Form.Control.Feedback>
                </Form.Group>
                </Stack>

                <div className = "text-content text-danger">
                        {error && <p>{error}</p>}
                </div>


                <Button variant='primary' type='submit'>
                Submit
                </Button>
            </Form>

            <Col md={3}></Col>
            </Row>
        </Container>

        <Toaster
            title = {toaster.title}
            message = {toaster.message}
            type = {toaster.type}
            showToast = {toaster.show}
            onClose = {() => setToaster({ ...toaster, show: false})}/>


        </Layout>


    );
}

export default ChangePassword;
