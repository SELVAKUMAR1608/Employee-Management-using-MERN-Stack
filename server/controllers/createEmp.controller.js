const Employee = require("../models/createEmp.model");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const createEmp = async (req, res) => {
    try {
        let {name,email,mobile,destination,gender,course,image} = req.body;
        console.log(req.body);
        
        let imageUrl = null;


        const file = req.files?.poster?.[0];
        if (!file) {
            return res.status(400).json({
                message: 'Image is required'
            })
        }
        const result = await new Promise((resolve,rejects)=>{
            const stream = cloudinary.uploader.upload_stream(
              {resource_type:'auto'},
              (error,result)=>{
                console.log(error);
                
                if(error) return rejects(error)
                  resolve(result)
              }
            );
            stream.end(file.buffer)
          })
      
          console.log(result.secure_url)

        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({
                message: 'Employee already exist'
            })
        }
        let newEmployee =await Employee.create({
            name:name,
            email:email,
            mobile:mobile,
            destination:destination,
            gender:gender,
            course:course,
            poster:result.secure_url,

        });
        let savedEmployee = await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", savedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", error: error.message });
    }
};


const getEmp = async (req, res) => {
    try {
        let employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};

const updateEmp = async (req, res) => {
    let { name, email, mobile, gender, destination, course } = req.body;
    let { empId } = req.params
    console.log("Updating employee with ID:", empId);

    try {
        const file = req.files?.poster?.[0];
        let result;
        if(file){
           result = await new Promise((resolve,rejects)=>{
            const stream = cloudinary.uploader.upload_stream(
              {resource_type:'auto'},
              (error,result)=>{
                if(error) return rejects(error)
                  resolve(result)
              }
            );
            stream.end(file.buffer)
          })
      
          console.log(result.secure_url)
        }
        let empToUpdate={
            name,
            email,
            gender,
            mobile,
            destination,
            course
         }
         if(file){
           empToUpdate.poster=result.secure_url
         }
        await Employee.findByIdAndUpdate(empId,empToUpdate)
            
        res.status(200).json({ message: "updated succesfully" })

    } catch (error) {
        res.status(500).json({ message: "Error while updating " })

    }
}

const deleteEmp = async (req, res) => {
    let { empId } = req.params;
    try {
        await Employee.findByIdAndDelete(empId)
        res.status(200).json({ message: "Deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Error while Deleting" })

    }
}

module.exports = { createEmp, getEmp, updateEmp, deleteEmp };