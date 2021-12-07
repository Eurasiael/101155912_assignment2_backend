const mongoose = require("mongoose");
const express = require("express");
const app = express();
const eModel = require("../../models/Employee");

// List employees
// GET /api/v1/employee
app.get("/employees", async (req, res) => {
  const employees = await eModel.find();
  if (employees.length == 0) {
    res.status(404).send("NOT FOUND.");
  } else {
    try {
      res.send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

// Find a Employee
// GET /api/v1/employee/:id
app.get("/employees/:id", async (req, res) => {
  const id = req.params.id;
  eModel.findOne({ employeeID: id }, function (err, docs) {
    if (err) {
      console.log("Error: " + err);
      res.status(500).send(err);
      return;
    } else {
      if (docs == null) {
        res.status(400).send("NOT FOUND.");
      } else {
        console.log("Employee Data : ", docs);
        res.status(200).json(docs);
      }
    }
  });
});

// Create New Record
// POST /api/v1/employee
app.post("/employees", async (req, res) => {
  const employee = new eModel(req.body);

  try {
    await employee.save();
    res.status(200).send("Employee Data Saved!");
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).send(err);
  }
});

// Update a Employee
// PUT /api/v1/employee/:id
app.put("/employees/:id", async (req, res) => {
  const id = req.params.id;

  eModel.findOneAndUpdate(
    { employeeID: id },
    req.body,
    { new: true },
    function (err, docs) {
      if (err) {
        console.log("Error: " + err);
        res.status(500).send(err);
      } else {
        console.log("Employee Data : ", docs);
        res.status(200).send("Employee Data Updated!.");
      }
    }
  );
});

// Delete a Employee
// DELETE /api/v1/employees/:id
app.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;

  eModel.findOneAndDelete({ employeeID: id }, function (err, docs) {
    if (err) {
      console.log("Error : " + err);
      res.status(500).send(err);
    } else {
      console.log("Deleted Employee Data : ", docs);
      res.status(200).send("Employee Data Deleted!");
    }
  });
});

module.exports = app;
