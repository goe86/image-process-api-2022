
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    user_id integer REFERENCES users(id)
);   