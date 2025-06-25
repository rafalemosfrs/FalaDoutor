import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';

const BulkUpload = ({ endpoint }) => {
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
    try {
      const res = await axios.post(`http://localhost:5000/api/${endpoint}/bulk`, data);
      alert(`Importação concluída: ${res.data.message || 'sucesso'}`);
      window.location.reload();
    } catch (error) {
      console.error('Erro na importação:', error);
      alert('Erro ao importar dados. Verifique o console.');
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
