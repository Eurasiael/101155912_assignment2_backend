const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("mongoose-validator");

var mongoose_auto_increment = require("mongoose-auto-increment");
mongoose_auto_increment.initialize(mongoose.connection);

const EmployeeSchema = new Schema({
  employeeID: {
    type: Number,
    default: 0,
  },
  firstName: {
    type: String,
    required: [true, "required firstname"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "required lastname"],
  },
  emailId: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: [
      validator({
        validator: "isEmail",
        message: "Enter a valid email form.",
      }),
    ],
  },
});

EmployeeSchema.plugin(mongoose_auto_increment.plugin, {
  model: "Employee",
  field: "employeeID",
  startAt: 1,
  increment: 1,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
