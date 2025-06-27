CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    crm VARCHAR(20) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    especialidade VARCHAR(100) NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    plan_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    base_value DECIMAL(10, 2) NOT NULL
);

CREATE TABLE doctor_plans (
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  PRIMARY KEY (doctor_id, plan_id)
);

create table consults (
 id SERIAL PRIMARY KEY,
  data DATE NOT NULL,
  medico_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  paciente_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  plano_id INTEGER REFERENCES plans(id) ON DELETE CASCADE
);

