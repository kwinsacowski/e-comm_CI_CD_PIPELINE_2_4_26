import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { createUserProfile } from "../firebase/user";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create Firestore document
    await createUserProfile(user.uid, user.email);

    alert("Registration successful!");
    navigate("/");
  } catch (error) {
    alert("Registration failed: " + (error as Error).message);
  }
};

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Control
          className="mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
