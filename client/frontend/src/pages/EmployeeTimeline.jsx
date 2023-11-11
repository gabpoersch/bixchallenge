import React from 'react';
import { useParams } from 'react-router-dom';
import Timeline from '../components/Timeline';


const EmployeeTimeline = () => {
  const { id } = useParams();
  return <Timeline employeeId={id} />;
};

export default EmployeeTimeline;
