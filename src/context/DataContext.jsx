import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plans');
      setPlans(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      setPlans([]);
    }
  };

  const addPlan = async (plan) => {
    try {
      const response = await axios.post('http://localhost:5000/api/plans', plan);
      setPlans([...plans, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar plano:', error);
    }
  };

  const updatePlan = async (updatedPlan) => {
    try {
      await axios.put(`http://localhost:5000/api/plans/${updatedPlan.id}`, updatedPlan);
      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/plans/${id}`);
      setPlans(plans.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir plano:', error);
    }
  };

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

  const addDoctor = async (doctor) => {
    try {
      console.log('Enviando médico:', doctor);
      const response = await axios.post('http://localhost:5000/api/doctors', doctor);
      setDoctors([...doctors, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar médico:', error?.response?.data || error);
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

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      setPatients([]);
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
      plans,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addPatient,
      updatePatient,
      deletePatient,
      addPlan,
      updatePlan,
      deletePlan,
      fetchDoctors,     // ✅ agora disponível no contexto
      fetchPatients     // ✅ agora disponível no contexto
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
