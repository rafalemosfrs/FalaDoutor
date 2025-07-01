import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [consultasHoje, setConsultasHoje] = useState([]);
  const [notificacoesLidas, setNotificacoesLidas] = useState(false);

  const toggleDropdown = async () => {
    if (!showDropdown && !notificacoesLidas) {
      const hoje = new Date().toISOString().split('T')[0];

      try {
        const res = await fetch(`http://localhost:5000/api/consults?start_date=${hoje}&end_date=${hoje}`);
        const data = await res.json();
        setConsultasHoje(data);
        setNotificacoesLidas(false);
      } catch (err) {
        console.error('Erro ao buscar consultas de hoje:', err);
        setConsultasHoje([]);
      }
    }

    setShowDropdown(!showDropdown);
  };

  const marcarComoLidas = () => {
    setNotificacoesLidas(true);
    setShowDropdown(false);
  };

  return (
    <header className="bg-primary-50 text-white py-4 shadow-md relative">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-white tracking-wide">
          Fala Doutor
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative p-2 hover:bg-primary-100 rounded-full transition"
            title="Ver consultas do dia"
          >
            <FaBell size={20} />
            {!notificacoesLidas && consultasHoje.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {consultasHoje.length}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-lg shadow-lg z-50">
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="text-lg font-semibold">
                  Consultas de hoje ({consultasHoje.length})
                </h4>
                <button
                  onClick={marcarComoLidas}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Marcar como lidas
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                {consultasHoje.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhuma consulta marcada.</p>
                ) : (
                  consultasHoje.map((c) => (
                    <div key={c.id} className="border-b pb-2 text-sm text-gray-700">
                      <p><strong>Paciente:</strong> {c.patient_name}</p>
                      <p><strong>Médico:</strong> {c.doctor_name}</p>
                      <p><strong>Plano:</strong> {c.plan_name}</p>
                      <p><strong>Hora:</strong> {c.hora?.slice(0, 5)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
