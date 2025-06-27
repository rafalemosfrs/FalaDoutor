import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';

const BulkUpload = ({ endpoint, onSuccess }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      parseCSV(file);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      parseExcel(file);
    } else {
      alert('Formato de arquivo não suportado. Use .csv ou .xlsx');
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        await sendData(results.data);
      },
    });
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      await sendData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const sendData = async (data) => {
    if (!endpoint || typeof endpoint !== 'string') {
      alert('Endpoint de importação não definido corretamente.');
      return;
    }

    try {
      const sanitizedPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const fullUrl = endpoint.startsWith('http')
        ? endpoint
        : `http://localhost:5000${sanitizedPath}`;

      const response = await axios.post(fullUrl, data);
      alert('Importação concluída com sucesso!');
      console.log('✅ Resposta do servidor:', response.data);

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(); // chama função para atualizar dados na tela
      }
    } catch (error) {
      console.error('❌ Erro na importação:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
        alert(`Erro: ${error.response.data.error || 'Erro na importação'}`);
      } else {
        alert('Erro de rede ou resposta inesperada');
      }
    }
  };

  return (
    <div className="my-4">
      <label className="block mb-2 font-medium text-black">Importar via CSV ou Excel</label>
      <label className="btn btn-primary inline-block cursor-pointer">
        Escolher arquivo
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default BulkUpload;
