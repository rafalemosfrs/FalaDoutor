import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      const data = response.data;
  
      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        console.warn('Formato inesperado da resposta de /api/doctors:', data);
        setDoctors([]);
      }
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      setDoctors([]);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      setPatients([]);
    }
  };

  const addDoctor = async (doctor) => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctors', doctor);
      setDoctors([...doctors, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar médico:', error);
    }
  };

  const updateDoctor = async (updatedDoctor) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${updatedDoctor.id}`, updatedDoctor);
      setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors(doctors.filter(d => d.id !== id));
    } catch (error) {
      console.error('Erro ao excluir médico:', error);
    }
  };

  const addPatient = async (patient) => {
    try {
      const response = await axios.post('http://localhost:5000/api/patients', patient);
      setPatients([...patients, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  };

  const updatePatient = async (updatedPatient) => {
    try {
      await axios.put(`http://localhost:5000/api/patients/${updatedPatient.id}`, updatedPatient);
      setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients(patients.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      doctors,
      patients,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addPatient,
      updatePatient,
      deletePatient
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
