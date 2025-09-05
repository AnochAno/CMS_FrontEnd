// src/components/Login.js
import { useState } from "react";
import { Form, Button, Card, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (username === "admin" && password === "admin123") {
      onLogin(); // success
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Card className="p-4 shadow position-relative" style={{ width: "350px" }}>
        <h4 className="mb-3 text-center">UCMS Admin Login</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3">
            Login
          </Button>
        </Form>

        {/* 3-dot button inside card, bottom-right corner */}
        <div className="d-flex justify-content-end">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-credentials">
                <div>
                  <strong>Username:</strong> admin <br />
                  <strong>Password:</strong> admin123
                </div>
              </Tooltip>
            }
          >
            <Button variant="light" size="sm" className="p-2 rounded-circle shadow-sm">
              <ThreeDotsVertical />
            </Button>
          </OverlayTrigger>
        </div>
      </Card>
    </div>
  );
}
