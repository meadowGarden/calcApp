DROP TABLE IF EXISTS bills_of_materials_lines;
DROP TABLE IF EXISTS bills_of_materials;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS app_user;

/* materials */
CREATE TABLE materials (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50),
	description VARCHAR(200),
	purchase_uom VARCHAR(20),
	storage_uom VARCHAR(20),
	purchase_price FLOAT,
	price FLOAT,
	conversion_ratio FLOAT,
	CONSTRAINT pk_material PRIMARY KEY (id)
);

INSERT INTO materials
VALUES (DEFAULT, 'egg', 'Kiaušiniai RIDO Omega 3', 'SET', 'PIECE', 2.65, 0.265, 10);
INSERT INTO materials
VALUES (DEFAULT, 'milk', 'DVARO pienas, 3,5 % rieb.', 'LITER', 'LITER', 2.3, 2.3, 1);
INSERT INTO materials
VALUES (DEFAULT, 'sunflower oil', 'Ekologiškas saulėgrąžų aliejus BIONATURALIS be kvapo', 'LITER', 'LITER', 5.99, 5.99, 1);
INSERT INTO materials
VALUES (DEFAULT, 'sugar', 'PANEVĖŽIO cukrus PLIUS', 'KILOGRAM', 'KILOGRAM', 1.19, 1.19, 1);
INSERT INTO materials
VALUES (DEFAULT, 'table salt', 'Valgomoji akmens druska SALT HILL N12', 'KILOGRAM', 'KILOGRAM', 0.49, 0.49, 1);
INSERT INTO materials
VALUES (DEFAULT, 'flour', 'Kvietiniai miltai, a. r., 550 D', 'KILOGRAM', 'KILOGRAM', 1.19, 1.19, 1);
INSERT INTO materials
VALUES (DEFAULT, 'cottage cheese', 'Pusriebė DVARO varškė, 9 % rieb.', 'KILOGRAM', 'KILOGRAM', 6.69, 6.69, 1);
INSERT INTO materials
VALUES (DEFAULT, 'vanillin', 'MOČIUTĖS vanilinis cukrus', 'KILOGRAM', 'KILOGRAM', 14.5, 14.5, 1);
INSERT INTO materials
VALUES (DEFAULT, 'semolina', 'Manų kruopos DOBELES', 'KILOGRAM', 'KILOGRAM', 1.61, 1.61, 1);
INSERT INTO materials
VALUES (DEFAULT, 'dried cranberries', 'Džiovintos spanguolės ARIMEX', 'KILOGRAM', 'KILOGRAM', 19.97, 19.97, 1);




/* bom */
CREATE TABLE bills_of_materials (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50),
	description VARCHAR(200),
	uom VARCHAR(20),
	CONSTRAINT pk_bom PRIMARY KEY (id)
);

INSERT INTO bills_of_materials
VALUES (DEFAULT, 'pancake', 'for wafles pan', 'SET');




/* bom lines */
CREATE TABLE bills_of_materials_lines (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	material_id BIGINT REFERENCES materials(id) ON DELETE CASCADE ON UPDATE CASCADE,
	bom_id BIGINT REFERENCES bills_of_materials(id) ON DELETE CASCADE ON UPDATE CASCADE,
	quantity FLOAT,
	CONSTRAINT pk_bom_lines PRIMARY KEY (id)
);

INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 1, 1, 2); --'egg'
INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 4, 1, 0.025); --'sugar'
INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 5, 1, 0.003); --'table salt'
INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 3, 1, 0.045); --'sunflower oil'
INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 6, 1, 0.3); --'flour'
INSERT INTO bills_of_materials_lines
VALUES (DEFAULT, 2, 1, 0.5); --'milk'




/* user */
CREATE TABLE app_user (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	first_name VARCHAR (255),
	last_name VARCHAR (255),
	email VARCHAR (255),
	password VARCHAR (255),
	role VARCHAR (255),
	CONSTRAINT pk_user PRIMARY KEY(id)
);




/* tokens */
CREATE TABLE tokens (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	token VARCHAR(255),
	token_type VARCHAR(255),
	expired BOOLEAN,
	revoked BOOLEAN,
	user_id BIGINT REFERENCES app_user(id) ON UPDATE CASCADE ON DELETE	CASCADE,
	CONSTRAINT pk_tokens PRIMARY KEY(id)
);




