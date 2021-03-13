USE employee_db;

INSERT INTO department (name)
VALUES ("Medical Staffing");

INSERT INTO department (name)
VALUES ("Education");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ("IT");

SELECT * FROM department; 

INSERT INTO role (title, salary, department_id)
VALUES ('IT Helpdesk Assistant', 21000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Education Team Leader', 45000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 50000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Medical Staffing', 82000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Staffing Administrator', 19800, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Advisor', 35000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Junior Software Engineer', 30000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Education Advisor', 27000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('IT Manager', 85000, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shay", "Johnson", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sofi", "Sherman", 8, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jonathan", "Wills", 9, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katherine", "Oakley", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kwame", "Odei", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Henry", "Dobrev", 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elise", "Jacques", 6, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rosie", "Cole", 8, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ola", "Suley", 1, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sade", "Kelly", 1, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Morris", 5, 4);

SELECT * FROM employee;