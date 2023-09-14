import { Container, Row, Col, Card, Stack, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Toaster from '../components/Toaster';
import axios from 'axios';
import { sleep } from '../utils';

// tecv342tz4wfvx

function PasswordReset() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        password: '',
        repassword: '',
    });

    const [ toaster, setToaster ] = useState({
        title: "",
        show: false,
        message: "",
        type: "",
    });

    const handlesupmit = (event) => {
        event.preventDefault();
        const resetForm = event.currentTarget;
        if (resetForm.checkValidity() === false) {
            event.stopPropagation();
        }

        if (form.password !== form.repassword) {
            setError("Passwords do not match");
            event.stopPropagation();
            return
        }

        const data = {
            password: form.password,
            token: token,
        };

        axios.post("https://postgram.hamzabakkour.se/api/password_reset/confirm/", data)
        .then(() => {
            setToaster({
                type: "success",
                message: "Password reset sucess. You will be sent to login page in 5 seconds.",
                show: true,
                title: "Success",
                delay: 7000
            });
            setValidated(true);

            sleep(5000).then(() => {
                navigate("/");
                });
            setForm({});
        })
        .catch((err) => {
            if (err.message) {
                setError(err.request.response);
            }
        });
    };

    return (
        <>
        <Container>
        <Row>
            <Col md={3}></Col>
            <Col md={6} className='p-5'>
            <Card>
                <Card.Header as='h5' className='text-primary'>
                Reset your password
                </Card.Header>
                <Card.Body>
                <Form
                    id='reset-password-form'
                    className=''
                    noValidate
                    validated={validated}
                    onSubmit={handlesupmit}
                >
                    <Stack gap={4}>

                    <Form.Group>
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                        value={form.password}
                        onChange={e =>
                            setForm({
                            ...form,
                            password: e.target.value,
                            })
                        }
                        required
                        type='password'
                        placeholder='New password'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Reenter password</Form.Label>
                        <Form.Control
                        value={form.repassword}
                        onChange={e =>
                            setForm({
                            ...form,
                            repassword: e.target.value,
                            })
                        }
                        required
                        type='password'
                        placeholder='Reenter password'
                        />
                    </Form.Group>
                    </Stack>

                    <div className = "text-content text-danger">
                        {error && <p>{error}</p>}
                    </div>

                    <Button variant='primary' type='submit'>
                    Submit
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            </Col>

            <Col md={3}></Col>
        </Row>

        </Container>

        <Toaster
            title = {toaster.title}
            message = {toaster.message}
            type = {toaster.type}
            showToast = {toaster.show}
            onClose = {() => setToaster({ ...toaster, show: false})}
            delay = {toaster.delay}/>

        </>

    );
    }

export default PasswordReset;