
CREATE TABLE IF NOT EXISTS Users (
  id INT NOT NULL AUTO_INCREMENT,
  name CHAR(255),
  email CHAR(255) NOT NULL,
  password CHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS UserRoles (
  id INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  user_id INT NOT NULL,
  store_id INT,
  FOREIGN KEY (role_id) REFERENCES Roles(id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (store_id) REFERENCES Stores(id),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RolePermissions (
  id INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (permission_id) REFERENCES Permissions(id),
  FOREIGN KEY (role_id) REFERENCES Roles(id)
);

CREATE TABLE IF NOT EXISTS Permissions (
  id INT NOT NULL AUTO_INCREMENT,
  name CHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Roles (
  id INT NOT NULL AUTO_INCREMENT,
  name char(100) NOT NULL,
  description char(100),
  PRIMARY KEY(id),
);

CREATE TABLE IF NOT EXISTS Stores (
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT NOT NULL,
  name char(100) NOT NULL,
  address char(255),
  PRIMARY KEY(id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Items (
  id INT NOT NULL AUTO_INCREMENT,
  store_id INT NOT NULL,
  name char(100) NOT NULL,
  price FLOAT,
  quantity int,
  PRIMARY KEY(id),
  FOREIGN KEY (store_id) REFERENCES Stores(id)
);
