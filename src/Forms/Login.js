import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faLock,
	faKey,
	faBox,
} from "@fortawesome/free-solid-svg-icons";
import image from "../Images/sign_up.jpg";

const Login = () => {
	const navigate = useNavigate();

	const [credential, setCredential] = useState("");
	const [pwd, setPwd] = useState("");
	const [err, setErr] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios
		.post("https://vitalizemind-nodeapi.onrender.com/user/login", { credential, password: pwd })
		.then((response) => {
			const data = response.data;
			console.log(data.name);
			navigate("/dashboard", { state: { _id: data._id, name: data.name } });
		})
		.catch((error) => {
			setErr(error.response.data.message);
			console.log(error);
		});
	};

	return (
		<section className="login_form_section">
			<Container className="h-50">
				<Row className="d-flex justify-content-center align-items-center h-50">
					<Col lg={12} xl={11}>
						<Card text="black" style={{ borderRadius: "25px" }}>
							<Card.Body className="p-md-5">
								<Row className="justify-content-center">
									<Col md={10} lg={6} xl={5} order={{ md: 2, lg: 1 }}>
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
										Login with Us
										</p>
										<h6 className="login_write">
										Don't have an account?{" "}
										<Link to="/signup" className="login_Link">
											SignUp
										</Link>
										</h6>
										<Form className="mx-1 mx-md-4">
										<Form.Group className="d-flex flex-row align-items-center mb-4">
											<FontAwesomeIcon
											icon={faEnvelope}
											className="fa-lg me-3 fa-fw"
											/>
											<div className="form-outline flex-fill mb-0">
											<Form.Label htmlFor="email" className="form_label">
												<b>Email</b>
											</Form.Label>
											<Form.Control
												autoFocus
												type="email"
												id="email"
												value={credential}
												onChange={(e) => setCredential(e.target.value)}
											/>
											</div>
										</Form.Group>
										<Form.Group className="d-flex flex-row align-items-center mb-4">
											<FontAwesomeIcon
											icon={faKey}
											className="fa-lg me-3 fa-fw"
											/>
											<div className="form-outline flex-fill mb-0">
											<Form.Label
												htmlFor="form3Example1c"
												className="form_label"
											>
												<b>Password</b>
											</Form.Label>
											<Form.Control
												type="password"
												id="form3Example1c"
												value={pwd}
												onChange={(e) => setPwd(e.target.value)}
											/>
											</div>
										</Form.Group>
										{/* ... other form groups ... */}
										<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
											<Button
											variant="primary"
											size="lg"
											type="submit"
											className="signup_button"
											onClick={handleSubmit}
											>
											Login
											</Button>
										</div>
										</Form>
									</Col>
									<div className="col-md-6 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
										<img
										src={image}
										className="img-fluid"
										width={"560px"}
										position={"relative"}
										left={"20px"}
										alt="Sample image"
										style={{ borderRadius: "20px" }}
										/>
									</div>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Login;
