--Modelagem: https://dbdesigner.page.link/69sRXfQTUYdGUFrq7


--Criando Banco de Dados:
CREATE DATABASE "shortly";

--Criando Tabelas
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email  VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE shorten (
    id SERIAL PRIMARY KEY,
    "usersId" INTEGER REFERENCES "users"("id"),
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL
);