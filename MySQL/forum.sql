CREATE TABLE FORUM(
    url VARCHAR(255) PRIMARY KEY NOT NULL,
    answered BOOLEAN DEFAULT FALSE,
    respondent VARCHAR(10) DEFAULT ' '
)  