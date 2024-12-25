# nodejs_backend1

# SQL commands

show databases
create database srisync

use srisync
CREATE TABLE users (
    id INT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    course VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users

insert into users (id,name,course) values (1,"Sreenu","storage")
