const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const CryptoJS = require("crypto-js");
const salt = 10;
const secret_key = "secret";
const shift = 3;


const app = express();
app.use(express.json());


app.use(
  cors({
    region: ["http://localhost:3000/login"],
    method: ["POST", "GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kripto_db",
});


app.options("*", cors());


app.post("/signpup", (req, res) => {
  const sql =
    "INSERT INTO user_data (`username`,`password`,`phone_number`) VALUES (?,?,?)";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {

    if (err) return res.json({ Error: "Error hashing password" });
    const values = [req.body.fullname, hash, req.body.phonenum];


    db.query(sql, values, (err, data) => {

      if (err) return console.err("Connection to DB error", err);


      if (data.affectedRows > 0) {
        return res.json("Uploaded!");
      } else {
        return res.json("Upload Failed");
      }
    });
  });
});


app.post("/file", (req, res) => {

  const encryptAES = CryptoJS.AES.encrypt(req.body.filebody, secret_key).toString();
  const enCaesar = caesarEncrypt(encryptAES, shift);

  const sql = "INSERT INTO user_file (`filename`, `file_body`) VALUES (?,?)";

  db.query(sql, [req.body.filename, enCaesar], (err, data) => {
    if(err){
      console.err("Connection failed", err)
      return res.json("Failed")
    }

    if (data.affectedRows > 0) {
      return res.json("File Uploaded!");
    } else {
      return res.json("File Upload Failed");
    }
  })
  
});


app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user_data WHERE username = ?";

  db.query(sql, req.body.username, (err, data) => {
    if (err) return res.json("Login Failed, Failed Connection");
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json("No match in password DB");
          if (response) {
            return res.json("Logged");
          } else {
            return res.json("Failed, password doesn't match");
          }
        }
      );
    } else {
      return res.json({ Error: "Username not found" });
    }
  });
});


app.post("/logni", (req, res) => {
  const sql = "SELECT * FROM user_data WHERE phone_number = ?";

  db.query(sql, req.body.phonenum, (err, data) => {

    if (err) return res.json("Login Failed, Failed Connection");
    if (data.length > 0) {

      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json("No match in password DB");
          if (response) { 
            const {phonenum, username} = data[0];
            const token = jwt.sign({ phonenum, username }, secret_key);
            //console.log({'token ': token});
            return res.json({token: token, message: "Logged", username : username});
          } else {
            return res.json("Failed, password doesn't match");
          }
        }
      );
    } 
    else {
      return res.json({ Error: "Username not found" });
    }

    
  });
});


app.post("/fileup", (req, res) => {
  const sql = "INSERT INTO user_file (`filename`, `file_body`) VALUES (?,?)";
  
  db.query(sql, [req.body.filename, req.body.filebody], (err, data) => {
    if (err) return console.error("Connection failed", err);

    if (data.affectedRows > 0) {
      return res.json("File Uploaded!");
    } else {
      return res.json("File Upload Failed");
    }
  });
});


app.post("/filepup", (req, res) => {
  const sql = "INSERT INTO user_file (`filename`, `file_body`) VALUES (?,?)";

  CryptoJS.AES.encrypt(req.body.filebody, secret_key, (err, encrypt) => {
    if(err) return res.json("Failed");

    db.query(sql, [req.body.filename, encrypt], (err, data) => {
      if (err) return console.error("Connection failed", err);
  
      if (data.affectedRows > 0) {
        return res.json("File Uploaded!");
      } else {
        return res.json("File Upload Failed");
      }
    });
  })
});


function caesarEncrypt(text, shift) {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        // Uppercase letters
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        // Lowercase letters
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      } else {
        return char;
      }
    })
    .join("");
}

function caesarDecrypt(ciphertext, shift) {
  return caesarEncrypt(ciphertext, 26 - (shift % 26));
}


app.listen(8081, () => {
  console.log("listening...");
});
