--CREATE DATABASE pernsnake;
--\c pernsnake
CREATE TABLE snake(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  score INT NOT NULL
);