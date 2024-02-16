const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./dbConfig");

//const ipAddress = "34.229.57.169";
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// MySQL connection
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// API endpoint to save data
app.post("/api/saveData", (req, res) => {
  const dataToSave = req.body.data; // Assuming data is sent in the request body
  console.log("Received data:", dataToSave);

  // Check if the required properties exist
  if (
    !dataToSave ||
    !dataToSave.username ||
    !dataToSave.school_name ||
    !dataToSave.course_name ||
    !dataToSave.student_id ||
    !dataToSave.departnemt
  ) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or incomplete data received" });
    return;
  }

  // Use placeholders only in the VALUES clause
  const sql =
    "INSERT INTO usertable (username, school_name, course_name, student_id, departnemt) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [
      dataToSave.username,
      dataToSave.school_name,
      dataToSave.course_name,
      dataToSave.student_id,
      dataToSave.departnemt,
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving data" });
      } else {
        res.json({ success: true, message: "Data saved successfully" });
      }
    }
  );
});

// API endpoint to retrieve data
app.get("/api/getData", (req, res) => {
  const sql = "SELECT * FROM usertable";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error retrieving data:", error);
      res
        .status(500)
        .json({ success: false, message: "Error retrieving data" });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to update user details
app.put("/api/updateUserDetails", (req, res) => {
  const updatedUserDetails = req.body;

  // Check if the required properties exist
  if (
    !updatedUserDetails ||
    !updatedUserDetails.username ||
    !updatedUserDetails.school_name ||
    !updatedUserDetails.course_name ||
    !updatedUserDetails.student_id ||
    !updatedUserDetails.departnemt
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid or incomplete data received",
    });
    return;
  }
  console.log(updatedUserDetails);

  const sql =
    "UPDATE usertable SET username=?, school_name=?, course_name=?, student_id=?, departnemt=? WHERE userID=?";
  const values = [
    updatedUserDetails.username,
    updatedUserDetails.school_name,
    updatedUserDetails.course_name,
    updatedUserDetails.student_id,
    updatedUserDetails.departnemt,
    updatedUserDetails.userID, // Assuming userID is sent in the request body
  ];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error updating user details" });
    } else {
      res.json({ success: true, message: "User details updated successfully" });
    }
  });
});

// API endpoint to delete a user
app.delete("/api/deleteUser/:userID", (req, res) => {
  const userID = req.params.userID;

  // Check if userID is valid (you may want to perform additional validation)
  if (!userID) {
    res.status(500).json({ success: false, message: "Invalid userID" });
    return;
  }

  // Use a DELETE SQL query to delete the user
  const sql = "DELETE FROM usertable WHERE userID = ?";
  connection.query(sql, [userID], (error, results) => {
    if (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Error deleting user" });
    } else {
      res.json({ success: true, message: "User deleted successfully" });
    }
  });
});

// API endpoint to retrieve a specific user's details
app.get("/api/getUserDetails/:userID", (req, res) => {
  const userID = req.params.userID;

  const sql = "SELECT * FROM usertable WHERE userID = ?";

  connection.query(sql, [userID], (error, results) => {
    if (error) {
      console.error("Error retrieving user details:", error);
      res
        .status(500)
        .json({ success: false, message: "Error retrieving user details" });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Assuming the query returns only one user
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on ${port}`);
});
