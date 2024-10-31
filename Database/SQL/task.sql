CREATE TABLE roles(
  role_id INT NOT NULL,
  role_name varchar(25),

  PRIMARY KEY(role_id)
);

CREATE TABLE users(
  user_id INT NOT NULL,
  username varchar(25),
  password varchar(25),
  role_id INT,

  PRIMARY KEY(user_id),
  FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

CREATE TABLE tasks(
  task_id INT NOT NULL,
  user_id INT,
  title varchar(25),
  description varchar(60),
  category varchar(25),
  priority int,
  deadline TIMESTAMP,
  status varchar(25),

  PRIMARY KEY(task_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE audit(
  audit_id int NOT NULL,
  user_id int,
  action varchar(25),
  tstamp TIMESTAMP,

  PRIMARY KEY(audit_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE history(
  history_id int NOT NULL,
  task_id int,
  previous_status varchar(25),
  new_status varchar(25),
  change_timestamp TIMESTAMP,

  PRIMARY KEY(history_id),
  FOREIGN KEY(task_id) REFERENCES tasks(task_id)
);


