DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users(
                  id SERIAL PRIMARY KEY,
                  username VARCHAR(255) UNIQUE,
                  facebook_name VARCHAR(255),
                  facebook_token VARCHAR(255) UNIQUE,
                  facebook_id VARCHAR(255) UNIQUE,
                  password_digest VARCHAR(255) NOT NULL
);
