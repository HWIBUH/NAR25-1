CREATE TABLE progress(
	trainee_number CHAR(4) ,
    FOREIGN KEY (trainee_number) REFERENCES trainee(trainee_number)
)

INSERT INTO progress(trainee_number) VALUES
('T186'),
('T191'),
('T192'),
('T195'),
('T207'),
('T212'),
('T213'),
('T217'),
('T228'),
('T230'),
('T237'),
('T241'),
('T252'),
('T297'),
('T312'),
('T330'),
('T355');