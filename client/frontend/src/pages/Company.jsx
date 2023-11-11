import React, { useState, useEffect } from 'react';
import '../styles/Table.css';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [draftCompany, setDraftCompany] = useState({});
  const [creatingCompany, setCreatingCompany] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await fetch('http://127.0.0.1:8000/company/');
    const data = await response.json();
    setCompanies(data);
  };

  const editCompany = (company) => {
    setEditCompanyId(company.id);
    setDraftCompany({ ...company });
  };

  const cancelEdit = () => {
    setEditCompanyId(null);
    setCreatingCompany(false);
  };

  const handleSave = async () => {
    const response = await fetch(`http://127.0.0.1:8000/company/${editCompanyId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draftCompany),
    });
    if (response.ok) {
      setEditCompanyId(null);
      fetchCompanies();
    }
  };

  const handleChange = (e, field) => {
    setDraftCompany({ ...draftCompany, [field]: e.target.value });
  };

  const createNewCompany = () => {
    setCreatingCompany(true);
    setDraftCompany({ name: '', cnpj: '' });
  };

  const saveNewCompany = async () => {
    const response = await fetch('http://127.0.0.1:8000/company/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draftCompany),
    });
    if (response.ok) {
      setCreatingCompany(false);
      fetchCompanies();
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>CNPJ</th>
            <th>
              {!creatingCompany && (
                <button onClick={createNewCompany}>Create</button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {creatingCompany && (
            <tr>
              <td>New</td>
              <td>
                <input
                  type="text"
                  value={draftCompany.name}
                  onChange={(e) => handleChange(e, 'name')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={draftCompany.cnpj}
                  onChange={(e) => handleChange(e, 'cnpj')}
                />
              </td>
              <td>
                <button onClick={saveNewCompany}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </td>
            </tr>
          )}
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    value={draftCompany.name}
                    onChange={(e) => handleChange(e, 'name')}
                  />
                ) : (
                  company.name
                )}
              </td>
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    value={draftCompany.cnpj}
                    onChange={(e) => handleChange(e, 'cnpj')}
                  />
                ) : (
                  company.cnpj
                )}
              </td>
              <td>
                {editCompanyId === company.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => editCompany(company)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyPage;
