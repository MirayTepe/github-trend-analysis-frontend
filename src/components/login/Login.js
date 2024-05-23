import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const [user, setUser] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const { setAuth } = useAuth();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const postLogin = async (e) => {
        e.preventDefault();

        try {
            const b64Encode = btoa(`${user}:${pwd}`);

            const config = {
                headers: {
                    Authorization: `Basic ${b64Encode}`
                }
            }
            const resp = await axiosClient.get('/api/v1/auth/me', config);
            const data = resp.data;

            if (resp?.status === 200) {
                setErrMsg('');
                setAuth({ user: data, password: pwd });
                navigate(from, { replace: true });
            } else {
                setErrMsg("You were unable to login into the system");
            }
        } catch (error) {
            setErrMsg("Something went wrong " + error);
        }
    }

    return (
        <Container>
            <header>
                <h4>Login</h4>
            </header>
            <main className="login-container">
                <div className="login-layout">
                    <Form onSubmit={postLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Kullanıcı Adı:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Enter Username'
                                id="username"
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setUser(e.target.value)}
                                required
                                value={user || ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Şifre:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder='Password'
                                id="pwd"
                                autoComplete='off'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                value={pwd || ''}
                            />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Giriş Yap
                        </Button>
                    </Form>
                    {
                        errMsg ?
                            <div className="login-error-message">
                                <p>{errMsg}</p>
                            </div>
                            : null
                    }
                </div>
            </main>
        </Container>
    )
}

export default Login;
