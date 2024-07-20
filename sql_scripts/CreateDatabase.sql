DROP TABLE IF EXISTS ANIMAL, AVIS, HABITAT, IMAGE, RACE, RAPPORT_VETERINAIRE, HABITAT_IMAGE_RELATION, ANIMAL_IMAGE_RELATION, ROLE, SERVICE, "USER" CASCADE;

CREATE TABLE ANIMAL (
   ANIMAL_ID SERIAL PRIMARY KEY,
   RAPPORT_VETERINAIRE_ID INT,
   NAME TEXT,
   STATUS TEXT
);

CREATE TABLE AVIS (
   AVIS_ID SERIAL PRIMARY KEY,
   PSEUDO TEXT,
   COMMENT TEXT,
   ISVISIBLE BOOLEAN
);

CREATE TABLE HABITAT (
   HABITAT_ID SERIAL PRIMARY KEY,
   ANIMAL_ID INT,
   NAME TEXT,
   DESCRIPTION TEXT,
   COMMENT TEXT
);

CREATE TABLE IMAGE (
   IMAGE_ID SERIAL PRIMARY KEY,
   IMAGE_DATA BYTEA
);

CREATE TABLE RACE (
   RACE_ID SERIAL PRIMARY KEY,
   ANIMAL_ID INT,
   LABEL TEXT,
   DESCRIPTION TEXT
);

CREATE TABLE RAPPORT_VETERINAIRE (
   RAPPORT_VETERINAIRE_ID SERIAL PRIMARY KEY,
   DATE TIMESTAMP,
   DETAIL TEXT
);

CREATE TABLE HABITAT_IMAGE_RELATION (
   HABITAT_ID INT NOT NULL,
   IMAGE_ID INT NOT NULL,
   PRIMARY KEY (HABITAT_ID, IMAGE_ID)
);

CREATE TABLE ANIMAL_IMAGE_RELATION (
   ANIMAL_ID INT NOT NULL,
   IMAGE_ID INT NOT NULL,
   PRIMARY KEY (ANIMAL_ID, IMAGE_ID)
);

CREATE TABLE ROLE (
   ROLE_ID SERIAL PRIMARY KEY,
   USERNAME VARCHAR(255),
   LABEL TEXT
);

CREATE TABLE SERVICE (
   SERVICE_ID SERIAL PRIMARY KEY,
   NAME TEXT,
   DESCRIPTION TEXT
);

CREATE TABLE "USER" (
   USERNAME VARCHAR(255) NOT NULL,
   RAPPORT_VETERINAIRE_ID INT,
   PASSWORD TEXT,
   LASTNAME TEXT,
   FIRSTNAME TEXT NOT NULL,
   PRIMARY KEY (USERNAME)
);
