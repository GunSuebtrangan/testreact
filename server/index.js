const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const bcrypt = require("bcrypt");
// const { response } = require("express");
// const saltRound = 10;
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     key: "userid",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 5,
//     },
//   })
// );

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "employee_system",
});

app.post("/table", (req, res) => {
  const stdate = req.body.stdate;
  const enddate = req.body.enddate;
  const name = req.body.name;
  const emp = req.body.emp;
  const type = req.body.type;
  var where1 = "";
  var where2 = "";
  var where3 = "";
  var where4 = "";
  var where5 = "";
  if (type === 0) {
    where5 = `AND employee =${emp}`;
  }
  if (stdate && enddate) {
    where4 = `AND empleave_stdate >= "${stdate}" AND empleave_endate <="${enddate}" `;
  } else if (stdate && !enddate) {
    where1 = `AND empleave_stdate = "${stdate}" `;
  } else if (enddate && !stdate) {
    where2 = `AND empleave_endate = "${enddate}" `;
  }
  if (name) {
    where3 = `AND employee_fname LIKE "%${name}%" `;
  }
  const sql = `Select *,empleave_stdate + INTERVAL 1 DAY as empleave_stdate2,empleave_endate + INTERVAL 1 DAY as empleave_endate2 from employee,employee_leave,mst_depart,mst_duty,mst_typeleave where employee_mstdepart=mstdepart AND employee_mstduty=mstduty AND empleave_employee=employee AND empleave_typeleave=msttypeleave ${where1} ${where2} ${where3} ${where4} ${where5} AND empleave_approve="1"`;
  // console.log(sql)
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/showtypeleave", (req, res) => {
  db.query(
    "SELECT * FROM mst_typeleave Where msttypeleave_active=1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/selectuserleave", (req, res) => {
  const emp = req.body.employee;
  db.query(
    "Select * from employee_leave where empleave_employee=? and empleave_approve=1",
    [emp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/selectdtleave", (req, res) => {
  db.query(
    "select * from employee_leave,mst_typeleave where empleave_typeleave=msttypeleave AND empleave_approve=0",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // const convertBufferToString = Buffer.from(result[0].empleave_fileattach);
        // console.log(count(result));
        // console.log(result);
        var string = JSON.stringify(result);
        var json = JSON.parse(string);
        // const arr = [];

        // console.log(json.length);
        res.send(json);
      }
    }
  );
});
// const test = () => {
//   for (const i = 0; i <= 4; i++) {
//     console.log(i);
//   }
// };
app.post("/updateleave", (req, res) => {
  const empleave = req.body.empleave;
  const type = req.body.type;
  const name = req.body.name;
  // const date = req.body.date;
  db.query(
    "UPDATE employee_leave SET empleave_approve=?,empleave_approvedspname=? where empleave =?",
    [type, name, empleave],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/instleave", (req, res) => {
  const emp = req.body.emp;
  const typeleave = req.body.typeleave;
  const dspcprem = req.body.dspcprem;
  const stdat = req.body.stdat;
  const enddate = req.body.enddate;
  const img = req.body.img;
  const numleave = req.body.numleave;
  const name = req.body.name;
  const typeapprove = req.body.typeapprove;
  db.query(
    "insert into employee_leave(empleave_employee,empleave_typeleave,empleave_stdate,empleave_endate,empleave_totaldays,empleave_dspcprem,empleave_fileattach,empleave_recdspname,empleave_approve)values(?,?,?,?,?,?,?,?,?)",
    [
      emp,
      typeleave,
      stdat,
      enddate,
      numleave,
      dspcprem,
      img,
      name,
      typeapprove,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/selectemployee", (req, res) => {
  const emp = req.body.employee;
  // console.log(emp);
  db.query(
    "SELECT * from employee,employee_dt,mst_depart,mst_duty where employee =? AND employee=employeedt_employee AND mstdepart=employee_mstdepart AND mstduty=employee_mstduty",
    [emp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/selectleave", (req, res) => {
  db.query(
    "select * from mst_typeleave where msttypeleave_active=1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "select * from employee_dt,employee where employee=employeedt_employee and employeedt_username=? and employeedt_password=? and employee_status=1",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // req.session.user = result;
        // console.log(req.session.user);
        res.send(result);
      }
    }
  );
});
app.post("/inst_employeedt", (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  const idemp = req.body.idemp;
  const emptype = req.body.Status;

  db.query(
    "insert into employee_dt(employeedt_employee,employeedt_username,employeedt_password,employeedt_type) values(?,?,?,?)",
    [idemp, username, password, emptype],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// app.get("/session", (req, res) => {
//   if (req.session.user) {
//     console.log(req.session.user);
//     res.send({ Login: true, user: req.session.user });
//   } else {
//     res.send({ Login: false });
//   }
// });
// app.post("/inst_employeedt", (req, res) => {
//   const username = req.body.Username;
//   const password = req.body.Password;
//   const idemp = req.body.idemp;
//   const emptype = "0";
//   bcrypt.hash(password, saltRound, (err, hash) => {
//     if (err) {
//       console.log(err);
//     }
//     db.query(
//       "insert into employee_dt(employeedt_employee,employeedt_username,employeedt_password,employeedt_type) values(?,?,?,?)",
//       [idemp, username, hash, emptype],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       }
//     );
//   });
// });

app.get("/depart", (req, res) => {
  db.query(
    "select * from mst_depart where mstdepart_active=1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/duty", (req, res) => {
  const depart = req.body.pmdepart;
  db.query(
    "select * from mst_duty where mstduty_mstdepart = ? and mstduty_active=1",
    [depart],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/insertemployee", (req, res) => {
  const firstname = req.body.Firstname;
  const lastname = req.body.Lastname;
  const depart = req.body.Depart;
  const duty = req.body.Duty;
  const birthday = req.body.Birthday;
  const stwork = req.body.Stwork;
  const active = "1";
  db.query(
    "insert into employee(employee_mstdepart,employee_mstduty,employee_fname,employee_lname,employee_brithdate,employee_stwrkdate,employee_status) values(?,?,?,?,?,?,?)",
    [depart, duty, firstname, lastname, birthday, stwork, active],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/insert", (req, res) => {
  const firstname = req.body.Firstname;
  const lastname = req.body.Lastname;
  const email = req.body.Email;
  const password = req.body.Password;
  bcrypt.hash(password, saltRound, (err, hash) => {
    db.query(
      "insert into  employees(firstname,lastname,email,pw) values(?,?,?,?)",
      [firstname, lastname, email, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("values inserted");
        }
      }
    );
  });
});

app.listen("3001", () => {
  console.log("Server is running port 3001");
});
