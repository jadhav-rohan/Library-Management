const mysql = require("mysql");
const cred = require("./credentials");

class TABLES {
  constructor() {
    this.db = mysql.createConnection({
      ...cred,
      database: "library",
    });

    this.sql = {
      student:
        "CREATE TABLE IF NOT EXISTS STUDENT(idS int AUTO_INCREMENT, name VARCHAR(255), fine float(6,2) DEFAULT 0, PRIMARY KEY (idS))",
      book: "CREATE TABLE IF NOT EXISTS BOOK(idB int AUTO_INCREMENT, name VARCHAR(255), author VARCHAR(255), semester int(1), count int, PRIMARY KEY (idB))",
      borrow:
        "CREATE TABLE IF NOT EXISTS BORROW(idStudent int, idBook int, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,deadline TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        PRIMARY KEY (idStudent, idBook),\
        FOREIGN KEY(idStudent) REFERENCES STUDENT(idS),\
        FOREIGN KEY(idBook) REFERENCES BOOK(idB));",
      // update: "UPDATE BORROW SET deadline = DATE_ADD(deadline, INTERVAL 7 DAY)",
      users:
        "CREATE TABLE IF NOT EXISTS users( username VARCHAR(255), password text)",
      // deadline:
      //   "UPDATE BORROW SET `deadline` = DATE_ADD(`deadline`, INTERVAL 7 DAY);",
      // "CREATE TABLE IF NOT EXISTS BORROW(idStudent int, idBook int, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,deadline TIMESTAMP DEFAULT DATEADD(CURRENT_TIMESTAMP,INTERVAL 7 DAY),\
      //            PRIMARY KEY (idStudent, idBook),\
      //            FOREIGN KEY(idStudent) REFERENCES STUDENT(idS),\
      //            FOREIGN KEY(idBook) REFERENCES BOOK(idB))",
    };
  }

  initTable() {
    for (let i in this.sql) {
      this.db.query(this.sql[i], (err, result) => {
        if (err) {
          console.log(`Couldn't create table ${i}`);
          console.log(err);
        } else console.log(`Successfully created table ${i}`);
      });
    }
  }
}

module.exports = TABLES;
