import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [updateId, setUpdateId] = useState(null);

  // Fetch Clients
  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Open Modal for Insert
  const handleInsert = () => {
    setIsUpdate(false);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    });
    setShowModal(true);
  };

  // Open Modal for Update
  const handleEdit = (client) => {
    setIsUpdate(true);
    setFormData({
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      phone_number: client.phone_number,
    });
    setUpdateId(client.client_id);
    setShowModal(true);
  };

  // Save (Insert or Update)
  const handleSave = async () => {
    try {
      if (isUpdate) {
        // Update Client
        await axios.put(`http://localhost:3000/clients/${updateId}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success('Client updated successfully!');
      } else {
        // Insert Client
        await axios.post('http://localhost:3000/clients', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success('Client added successfully!');
      }
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Error saving client.');
    } finally {
      setShowModal(false);
    }
  };

  // Delete Client
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`);
      toast.success('Client deleted successfully!');
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Error deleting client.');
    }
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <th scope="row">{client.client_id}</th>
              <td>{client.first_name + ' ' + client.last_name}</td>
              <td>{client.email}</td>
              <td>{client.phone_number}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(client)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(client.client_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-3">
      <Button variant="success" onClick={handleInsert}>
        Add Client
      </Button>
    </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? 'Edit Client' : 'Add Client'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>
            {isUpdate ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};