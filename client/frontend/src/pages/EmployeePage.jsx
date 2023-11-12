import React, { useState, useEffect } from 'react';
import '../styles/Table.css';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [draftEmployee, setDraftEmployee] = useState({});
  const [creatingEmployee, setCreatingEmployee] = useState(false);

  const access = localStorage.getItem('access')

  useEffect(() => {
    fetchEmployees();
    fetchCompanies();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://127.0.0.1:8000/employee/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    });
    const data = await response.json();
    setEmployees(data);
  };

  const fetchCompanies = async () => {
    const response = await fetch('http://127.0.0.1:8000/company/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    });
    const data = await response.json();
    setCompanies(data);
  };

  const editEmployee = (employee) => {
    setEditEmployeeId(employee.id);
    setDraftEmployee({ ...employee });
  };

  const deleteEmployee = async (id) => {
    const confirmDeletion = window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS ENTRY? THIS ACTION IS IRREVERSIBLE!")

    if (confirmDeletion) {

      const response = await fetch(`http://127.0.0.1:8000/employee/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        }
      });
      if (response.ok) {
        fetchEmployees();
      }
    }
  };

  const cancelEdit = () => {
    setEditEmployeeId(null);
    setCreatingEmployee(false);
  };

  const handleSave = async () => {
    const response = await fetch(`http://127.0.0.1:8000/employee/${editEmployeeId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      },
      body: JSON.stringify(draftEmployee),
    });
    if (response.ok) {
      setEditEmployeeId(null);
      fetchEmployees();
    }
  };

  const handleChange = (e, field) => {
    setDraftEmployee({ ...draftEmployee, [field]: e.target.value });
  };

  const createNewEmployee = () => {
    setCreatingEmployee(true);
    setDraftEmployee({ name: '', cpf: '', company: '', start_date: '', end_date: '' });
  };

  const saveNewEmployee = async () => {
    const response = await fetch('http://127.0.0.1:8000/employee/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      },
      body: JSON.stringify(draftEmployee),
    });
    if (response.ok) {
      setCreatingEmployee(false);
      fetchEmployees();
    }
  };

  const companyOptions = companies.map((company) => (
    <option key={company.id} value={company.id}>
      {company.name} - {company.cnpj}
    </option>
  ));

  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>CPF</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Company ID</th>
          <th>
              {!creatingEmployee && (
                <button onClick={createNewEmployee}>Create</button>
              )}
            </th>
        </tr>
      </thead>
      <tbody>
        {creatingEmployee && (
          <tr>
            <td>New</td>
            <td><input className="edit-input" type="text" value={draftEmployee.name} onChange={(e) => handleChange(e, 'name')} /></td>
            <td><input className="edit-input" type="text" value={draftEmployee.cpf} onChange={(e) => handleChange(e, 'cpf')} /></td>
            <td><input type="date" value={draftEmployee.start_date} onChange={(e) => handleChange(e, 'start_date')} /></td>
            <td><input type="date" value={draftEmployee.end_date} onChange={(e) => handleChange(e, 'end_date')} /></td>
            <td>
              <select value={draftEmployee.company} onChange={(e) => handleChange(e, 'company')}>
                <option value="">Select Company</option>
                {companyOptions}
              </select>
            </td>
            <td>
              <button onClick={saveNewEmployee}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </td>
          </tr>
        )}
{employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>
              {editEmployeeId === employee.id ? <input className="edit-input" type="text" value={draftEmployee.name} onChange={(e) => handleChange(e, 'name')} /> : employee.name}
            </td>
            <td>
              {editEmployeeId === employee.id ? <input className="edit-input" type="text" value={draftEmployee.cpf} onChange={(e) => handleChange(e, 'cpf')} /> : employee.cpf}
            </td>
            <td>
              {editEmployeeId === employee.id ? <input type="date" value={draftEmployee.start_date} onChange={(e) => handleChange(e, 'start_date')} /> : employee.start_date}
            </td>
            <td>
              {editEmployeeId === employee.id ? <input type="date" value={draftEmployee.end_date} onChange={(e) => handleChange(e, 'end_date')} /> : employee.end_date || 'N/A'}
            </td>
            <td>
              {editEmployeeId === employee.id ? (
                <select value={draftEmployee.company} onChange={(e) => handleChange(e, 'company')}>
                  {companyOptions}
                </select>
              ) : (
                employee.company
              )}
            </td>
            <td className="action-buttons">
              {editEmployeeId === employee.id ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => editEmployee(employee)}>Edit</button>
                  <button className="table-button timeline" onClick={() => window.location.href = `timeline/${employee.id}`}>Timeline</button>
                  <button className="table-button delete" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default EmployeePage;
