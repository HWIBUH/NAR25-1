CREATE TABLE forumQuestions(
    [url] varchar(max) primary key not null,
    answerer varchar(10) default ' ',
    isCorrect boolean default FALSE,
)