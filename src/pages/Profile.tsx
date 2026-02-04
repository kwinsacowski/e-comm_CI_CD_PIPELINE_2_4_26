import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile, deleteUserAccount, type UserProfile } from "../firebase/user";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.uid).then((data) => {
      if (data) {
        setProfile(data);
        setName(data.name || "");
        setAddress(data.address || "");
      }
    });
  }, [user]);

  if (!user || !profile) return <p>Loading profile...</p>;

  const handleUpdate = async () => {
    await updateUserProfile(user.uid, { name, address });
    alert("Profile updated!");
    setProfile({ ...profile, name, address });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      await deleteUserAccount();
      alert("Account deleted.");
      navigate("/");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Your Profile</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email (cannot change)</Form.Label>
          <Form.Control type="email" value={profile.email || ""} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate} className="me-3">Update Profile</Button>
        <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
      </Form>
    </Container>
  );
};

export default Profile;