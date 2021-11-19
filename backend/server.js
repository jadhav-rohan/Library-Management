const express = require("express");
const mysql = require("mysql");
const DATABASE = require("./utilities/createDB");
const TABLES = require("./utilities/createTables");
const cred = require("./utilities/credentials");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
class LIBRARY {
  constructor(port, app) {
    this.port = port;
    this.app = app;
    this.app.use(express.json());
    this.temp = 0;
    this.app.use(
      cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      })
    );

    this.app.use(
      session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
          expires: 60 * 60 * 24,
        },
      })
    );

    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //Initialize Database
    new DATABASE().initDB();

    //Initialize All The Tables
    new TABLES().initTable();

    this.db = mysql.createConnection({
      ...cred,
      database: "library",
    });
  }

  get() {
    //GET LIST OF ALL THE BOOKS
    this.app.get("/api/getBooks", (req, res) => {
      let sql = `SELECT * FROM book`;
      this.db.query(sql, (err, result) => {
        if (err) console.log(err);
        else console.log("Successfully extracted books");
        res.send(result);
      });
    });

    this.app.post("/api/insert", (req, res) => {
      const id = req.body.bookId;
      const name = req.body.bookName;
      const author = req.body.bookAuthor;
      const sem = req.body.semester;
      const count = req.body.bookCount;

      const sqlInsert = "INSERT INTO book VALUES (?, ?, ?, ?, ?);";
      this.db.query(
        sqlInsert,
        [id, name, author, sem, count],
        (err, result) => {
          console.log(result);
        }
      );
    });

    //Signin
    this.app.post("/api/adduser", (req, res) => {
      const username = req.body.username;
      const id = req.body.userId;

      this.db.query(
        "INSERT INTO student(idS, name) VALUES (?, ?);",
        [id, username],
        (err, result) => {
          console.log(err);
        }
      );
    });

    this.app.post("/api/signin", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      // const id = req.body.id;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }

        this.db.query(
          "INSERT INTO users VALUES (?,?)",
          [username, hash],
          (err, result) => {
            console.log(err);
          }
        );
      });
    });

    this.app.get("/api/login", (req, res) => {
      // console.log(req.session);
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
      } else {
        res.send({ loggedIn: false });
      }
    });

    this.app.post("/api/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;

      this.db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }

          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
              } else {
                res.send({ message: "Wrong username/password combination!" });
              }
            });
          } else {
            res.send({ message: "User doesn't exist" });
          }
        }
      );
    });
    //GET LIST OF BOOKS BY SEMESTER
    this.app.get("/api/getBooks/:id", (req, res) => {
      let sql = `SELECT * FROM book where semester = '${req.params.id}'`;
      this.db.query(sql, (err, result) => {
        if (err) console.log(err);
        else console.log("Successfully extracted books");
        res.send(result);
      });
    });

    //BORROW A BOOK
    this.app.post("/api/borrow", (req, res) => {
      let sql = [
        `INSERT INTO BORROW(idStudent, idBook) VALUES (${req.body.sid}, ${req.body.idB});`,
        `Update BOOK SET count = count - 1 WHERE idB = ${req.body.idB}`,
      ];

      for (let i = 0; i < sql.length; i++) {
        this.db.query(sql[i], (err, result) => {
          if (err) {
            console.log(err);
            console.log("Couldn't add");
            this.temp = 1;
          } else console.log("Successfully inserted");
        });
        if (this.temp) break;
      }
    });

    //GET ALL THE ISSUED BOOKS BY A STUDENT
    this.app.get("/api/getIssues/:sid", (req, res) => {
      let sql = `SELECT book.name, book.author, book.semester, book.idB, borrow.date, borrow.deadline, student.name as sname\
                       FROM book, student, borrow\
                       where borrow.idStudent = '${req.params.sid}' and book.id = borrow.idBook and student.id = '${req.params.sid}'`;

      this.db.query(sql, (err, result) => {
        if (err) console.log(err);
        else console.log("Successfully extracted issues");
        res.send(result);
      });
    });

    //RETURN A BOOK, UPDATE FINE IF ANY
    this.app.post("/api/return", (req, res) => {
      let sql = [
        `SELECT deadline from borrow\
                        WHERE idBook = ${req.body.id} and idStudent = ${req.body.sid}`,
        `DELETE FROM borrow where idStudent = ${req.body.sid} and idBook = ${req.body.id}`,
        `UPDATE BOOK SET count = count + 1 WHERE id = ${req.body.id}`,
      ];

      for (let i = 0; i < sql.length; i++) {
        this.db.query(sql[i], (err, result) => {
          if (err) {
            console.log("Couldn't return");
          }

          //FOR FINE
          else if (i == 0) {
            var d1 = new Date(result[0].deadline);
            var d2 = new Date();
            const timeDiff = d2 - d1;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff > 0) {
              this.db.query(
                `UPDATE STUDENT SET fine = fine + ${
                  (daysDiff - 1) * 10
                } WHERE id = '${req.body.sid}'`,
                (err, result) => {
                  if (err) console.log(err);
                  else console.log("Fine Updated Succesfully");
                }
              );
            }
          }
        });
      }
    });

    //GET ALL THE STUDENTS WHO HAVE ISSUED A PARTICULAR BOOK
    this.app.get("/api/students/:id", (req, res) => {
      let sql = `SELECT student.name, borrow.date, borrow.deadline\
                       FROM student, borrow\
                       where borrow.idBook = '${req.params.id}' and student.id = borrow.idStudent`;

      this.db.query(sql, (err, result) => {
        if (err) console.log("Couldn't get issues");
        else console.log("Successfully extracted issues");
        res.send(result);
      });
    });
  }

  listen() {
    this.app.listen(this.port, (err) => {
      if (err) console.log(err);
      else console.log(`Server Started On ${this.port}`);
    });
  }
}

let library = new LIBRARY(3002, express());
library.get();
library.listen();
