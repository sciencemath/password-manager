CREATE DATABASE [IF NOT EXISTS] passwordmanagement;

USE passwordmanagement;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    savedpasswords json
);