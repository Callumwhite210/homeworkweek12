DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

INSERT INTO department (department_name)
VALUES ("Sales Team");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales","10000","123");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jack","White","123","345"),
("Steven", "Jones","223", "967");
