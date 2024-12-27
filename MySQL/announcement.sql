CREATE TABLE announcement(
    announcement_id int(4) PRIMARY KEY AUTO_INCREMENT,
    announcement_title LONGTEXT,   
    announcement_content LONGTEXT,
    announcement_deadline VARCHAR(255)
)