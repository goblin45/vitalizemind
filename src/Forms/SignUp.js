import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faLock,
	faKey,
	faBox,
	faPerson,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../Images/sign_up.jpg";

const SignUp = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState(null);
	const [relation1, setRelation1] = useState("");
	const [alertRecipient1, setAlertRecipient1] = useState("");
	const [relation2, setRelation2] = useState("");
	const [alertRecipient2, setAlertRecipient2] = useState("");

	const onSubmitClicked = async (e) => {
		e.preventDefault();
		let recipient1 = { relation: relation1, e_mail: alertRecipient1 };
		let recipient2 = { relation: relation2, e_mail: alertRecipient2 };

		console.log(recipient1, recipient2);

		axios
		.post("https://vitalizemind-nodeapi.onrender.com/user", {
			name,
			e_mail: email,
			password,
			recipient1,
			recipient2,
		})
		.then((response) => {
			console.log(response);
			const user = response.data;
			navigate("/dashboard", { state: { _id: user._id, name: user.name } });
		})
		.catch((error) => {
			setErr(error.response.data.message);
			console.log(error);
		});
	};

	return (
		<section className="form_section">
			<Container className="h-50">
				<Row className="d-flex justify-content-center align-items-center h-100">
					<Col lg={12} xl={12}>
						<Card text="black" style={{ borderRadius: "25px" }}>
							<Card.Body className="p-md-5">
								<Row className="justify-content-center">
									<Col md={10} lg={6} xl={5} order={{ md: 2, lg: 1 }}>
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
										Signup with Us
										</p>
										<h6 className="login_write">
										Already have an account?{" "}
										<Link to="/login" className="login_Link">
											Login
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
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
											</div>
										</Form.Group>

										<Form.Group className="d-flex flex-row align-items-center mb-4">
											<FontAwesomeIcon
											icon={faUser}
											className="fa-lg me-3 fa-fw"
											/>
											<div className="form-outline flex-fill mb-0">
											<Form.Label
												htmlFor="form3Example1c"
												className="form_label"
											>
												<b>Name</b>
											</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
											</div>
										</Form.Group>

										<Form.Group className="d-flex flex-row align-items-center mb-4">
											<FontAwesomeIcon
											icon={faPerson}
											className="fa-xl me-3 fa-fw"
											/>
											<div className="form-outline flex-fill mb-0">
											<div className="relation_field">
												<div className="form_label_relation">
												<Form.Label htmlFor="form3Example1c">
													<b>Relation</b>
												</Form.Label>
												<Form.Select
													type="text"
													value={relation1}
													onChange={(e) => setRelation1(e.target.value)}
												>
													<option value="Father">Father</option>
													<option value="Mother">Mother</option>
													<option value="Husband">Husband</option>
													<option value="Wife">Wife</option>
													<option value="Relative">Relative</option>
													<option value="Friend">Friend</option>
												</Form.Select>
												</div>
												<div className="form_label_email">
												<Form.Label htmlFor="form3Example1c">
													<b>Email</b>
												</Form.Label>
												<Form.Control
													type="text"
													value={alertRecipient1}
													onChange={(e) =>
													setAlertRecipient1(e.target.value)
													}
												/>
												</div>
											</div>
											</div>
										</Form.Group>
										<Form.Group className="d-flex flex-row align-items-center mb-4">
											<FontAwesomeIcon
											icon={faPerson}
											className="fa-xl me-3 fa-fw"
											/>
											<div className="form-outline flex-fill mb-0">
											<div className="relation_field">
												<div className="form_label_relation">
												<Form.Label htmlFor="form3Example1c">
													<b>Relation</b>
												</Form.Label>
												<Form.Select
													type="text"
													value={relation2}
													onChange={(e) => setRelation2(e.target.value)}
												>
													<option value="Father">Father</option>
													<option value="Mother">Mother</option>
													<option value="Husband">Husband</option>
													<option value="Wife">Wife</option>
													<option value="Relative">Relative</option>
													<option value="Friend">Friend</option>
												</Form.Select>
												</div>
												<div className="form_label_email">
												<Form.Label htmlFor="form3Example1c">
													<b>Email</b>
												</Form.Label>
												<Form.Control
													type="text"
													value={alertRecipient2}
													onChange={(e) =>
													setAlertRecipient2(e.target.value)
													}
												/>
												</div>
											</div>
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
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											</div>
										</Form.Group>
										{err?.length? (
											<div><h6 className='err_message'>{err}</h6></div>
										):<div/>
                      }
									
										<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
											<Button
												variant="primary"
												size="lg"
												type="submit"
												className="signup_button"
												onClick={onSubmitClicked}
											>
											SignUp
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

export default SignUp;
