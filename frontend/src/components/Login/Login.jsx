import React, { useState } from "react";
// import {useNavigate} from 'react-router-dom';
import { userLogin } from "../../services/userApi";
import { setUserDetails } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function Login({ openModal, toggleModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleUserLogin = async () => {
        try {
            const { data } = await userLogin({ email, password });
            if (data.login) {
                localStorage.setItem("JwtToken", data.token);
                dispatch(
                    setUserDetails({
                        id: data.user._id,
                        name: data.user.fullName,
                        email: data.user.email,
                        image: data.user.picture,
                        token: data.token,
                    })
                );
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <>
            <Modal
                show={openModal === "login-form"}
                size="md"
                popup
                onClose={() => toggleModal(undefined)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Login
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="mail@sample.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a
                                href="/modal"
                                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="w-full">
                            <Button onClick={handleUserLogin}>Login</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <p
                                className="text-cyan-700 hover:underline cursor-pointer dark:text-cyan-500"
                                onClick={() => toggleModal("signup-form")}
                            >
                                Create account
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
