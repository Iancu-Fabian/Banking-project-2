import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ClientLoansList = () => {
  const [clientLoans, setClientLoans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    loan_id: '',
    loan_date: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // Fetch client loans
  const fetchClientLoans = async () => {
    try {
      const response = await fetch('http://localhost:3000/client_loans', { mode: 'cors' });
      const data = await response.json();
      setClientLoans(data);
    } catch (error) {
      console.error('Error fetching client loans:', error);
    }
  };

  // Handle insert button click
  const handleInsert = () => {
    setIsUpdate(false);
    setFormData({
      client_id: '',
      loan_id: '',
      loan_date: ''
    });
    setShowModal(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      const url = isUpdate
        ? `http://localhost:3000/client_loans/${updateId}`
        : 'http://localhost:3000/client_loans';

      const method = isUpdate ? 'put' : 'post';
      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(`${isUpdate ? 'Updated' : 'Added'} successfully!`);
        fetchClientLoans();
      } else {
        toast.error('Error saving the client loan.');
      }
    } catch (error) {
      toast.error('Error saving client loan.');
    } finally {
      setShowModal(false);
    }
  };

  // Handle edit button
  const handleEdit = (loan) => {
    setIsUpdate(true);
    setUpdateId({ client_id: loan.client_id, loan_id: loan.loan_id });
    setFormData({
      client_id: loan.client_id,
      loan_id: loan.loan_id,
      loan_date: loan.loan_date
    });
    setShowModal(true);
  };

  // Handle delete button
  const handleDelete = async (client_id, loan_id) => {
    try {
      await axios.delete(`http://localhost:3000/client_loans/${client_id}/${loan_id}`);
      toast.success('Deleted successfully!');
      fetchClientLoans();
    } catch (error) {
      toast.error('Error deleting the client loan.');
    }
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    fetchClientLoans();
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Client ID</th>
            <th scope="col">Loan ID</th>
            <th scope="col">Loan Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientLoans.map((loan, index) => (
            <tr key={index}>
              <th scope="row">{loan.client_id}</th>
              <td>{loan.loan_id}</td>
              <td>{loan.loan_date}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(loan)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(loan.client_id, loan.loan_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Button variant="success" onClick={handleInsert}>
          Add New Client Loan
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? 'Update Client Loan' : 'Add Client Loan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="client_id">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                type="text"
                name="client_id"
                value={formData.client_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="loan_id">
              <Form.Label>Loan ID</Form.Label>
              <Form.Control
                type="text"
                name="loan_id"
                value={formData.loan_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="loan_date">
              <Form.Label>Loan Date</Form.Label>
              <Form.Control
                type="date"
                name="loan_date"
                value={formData.loan_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};