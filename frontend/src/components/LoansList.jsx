import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoansList = () => {
  const [loans, setLoans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    loan_type: '',
    amount: '',
    interest_rate: '',
    start_date: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // Fetch loans
  const fetchLoans = async () => {
    try {
      const response = await fetch('http://localhost:3000/loans', { mode: 'cors' });
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  // Handle insert
  const handleInsert = () => {
    setIsUpdate(false);
    setFormData({
      loan_type: '',
      amount: '',
      interest_rate: '',
      start_date: '',
    });
    setShowModal(true);
  };

  // Handle save (insert or update)
  const handleSave = async () => {
    try {
      if (isUpdate) {
        // Update existing loan
        const response = await axios.put(`http://localhost:3000/loans/${updateId}`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
          fetchLoans();
          toast.success('Loan updated successfully!');
        } else {
          toast.error('Error updating loan.');
        }
      } else {
        // Insert new loan
        const response = await axios.post('http://localhost:3000/loans', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 201) {
          fetchLoans();
          toast.success('Loan added successfully!');
        } else {
          toast.error('Error adding loan.');
        }
      }
    } catch (error) {
      console.error('Error saving loan:', error);
      toast.error('An error occurred.');
    } finally {
      setShowModal(false);
    }
  };

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle edit
  const handleEdit = (loan) => {
    setIsUpdate(true);
    setUpdateId(loan.loan_id);
    setFormData({
      loan_type: loan.loan_type,
      amount: loan.amount,
      interest_rate: loan.interest_rate,
      start_date: loan.start_date,
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (loanId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/loans/${loanId}`);
      if (response.status === 200) {
        fetchLoans();
        toast.success('Loan deleted successfully!');
      } else {
        toast.error('Error deleting loan.');
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
      toast.error('An error occurred.');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Interest Rate</th>
            <th scope="col">Start Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <th scope="row">{loan.loan_id}</th>
              <td>{loan.loan_type}</td>
              <td>{loan.amount}</td>
              <td>{loan.interest_rate}</td>
              <td>{format(new Date(loan.start_date), 'MMMM dd, yyyy')}</td>
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
                  onClick={() => handleDelete(loan.loan_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Button Below the Table */}
      <div className="text-center mt-3">
        <Button variant="success" onClick={handleInsert}>
          Add Loan
        </Button>
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? 'Edit Loan' : 'Add Loan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="loan_type">
              <Form.Label>Loan Type</Form.Label>
              <Form.Control
                type="text"
                name="loan_type"
                value={formData.loan_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="interest_rate">
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control
                type="number"
                name="interest_rate"
                value={formData.interest_rate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
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
            {isUpdate ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};