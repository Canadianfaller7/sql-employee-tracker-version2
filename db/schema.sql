DROP DATABASE IF EXISTS employee_trackerV2_db;
CREATE DATABASE employee_trackerV2_db;

USE employee_trackerV2_db;

CREATE TABLE departments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(13, 2),
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);
