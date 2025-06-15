CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    crm VARCHAR(20) NOT NULL UNIQUE
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
    name VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO plans (name)
VALUES ('Plano Básico'), ('Plano Intermediário'), ('Plano Premium');

INSERT INTO doctors (name, cpf, crm)
VALUES ('Dr. João Silva', '12345678901', 'CRM-SP-12345');

INSERT INTO patients (name, cpf, birth_date, plan_id)
VALUES ('Maria Oliveira', '98765432109', '2000-01-15', 1);
