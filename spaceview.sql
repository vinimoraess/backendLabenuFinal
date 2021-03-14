CREATE TABLE IF NOT EXISTS spaceview_users (
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS spaceview_image (
	id VARCHAR(255) PRIMARY KEY,
    subtitle VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    date date,
    file VARCHAR(255) NOT NULL,
    collection VARCHAR(255) NOT NULL   
);

CREATE TABLE IF NOT EXISTS spaceview_tags (
	id VARCHAR(255) PRIMARY KEY,
    tag VARCHAR(255) UNIQUE NOT NULL,
    image_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (image_id) REFERENCES spaceview_image(id)
);

SELECT * FROM spaceview_users;
SELECT * FROM spaceview_image;
DELETE FROM spaceview_users WHERE nickname = "vinivetetos";