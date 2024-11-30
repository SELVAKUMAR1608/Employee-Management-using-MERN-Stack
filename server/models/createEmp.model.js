const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    destination: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String], required: true },
    poster:{type:String, require:true},
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;