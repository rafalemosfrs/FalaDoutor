import { useState } from 'react'
import './App.css'
import { DataProvider } from './context/DataContext'
import Header from './components/Header'
import DoctorCard from './components/doctors/DoctorCard'
import PatientCard from './components/patients/PatientCard'

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DoctorCard />
            <PatientCard />
          </div>
        </main>
      </div>
    </DataProvider>
  )
}

export default App