const formapi=  require('../models/form_api');
const{StatusCodes}=require("http-status-codes");
const {BadRequestError,NotFoundError}=require("../errors");
const { FormInfo } = require('../models/form_api')
const FormRequestModel = require('../models/formRequests')
const nodemail=require("nodemailer");
const { Subject } = require('@material-ui/icons');


// const create=async(req,res)=>{
//     await formapi.create({NameofPublisher:"hello", PublisherEmail:"sundar@gmail.com",
//     NameofTemplate:"midtemplate",TypeofTemplate:"mid paper"}),res.send("helloworld");
// }

const createform =async(req,res)=>{
    //req.body.createdBy = req.user.userId
           const task= await formapi.create(req.body)

        res.status(StatusCodes.CREATED).json(task);
        
    }

const getallforminfo = async (req,res)=>{
    try {
        const detail = await formapi.find();
        return res.status(200).json({detail});
    }catch(error) {
        return res.status(404).json({message: error.message});
    }
}

const getforminfo =(req,res)=>{
    res.send("getforminfo");
}



const getAllRequests = async(req, res) => {
    try {
        console.log("hvyv")
        const detail = await FormRequestModel.find();
        return res.status(200).json(detail);
    }
    catch(error) {
        return res.status(404).json({message: error.message});
    }
}

const postRequest = async (req,res) => {
    try {
        console.log(req.body);
        const task= await FormRequestModel.create(req.body);

        return res.status(200).json(task);
    }catch(error) {
        return res.status(404).json({message: error.message});
    }
  
}

const getRequestById = async (req,res)=>{
    try {
        var mail_to=""
        const detbyid = await FormRequestModel.find({"NameofTemplate": req.params.id});
        detbyid.map((mail)=>{
             mail_to =mail.PublisherEmail;
          
        })
        console.log(mail_to)
        let mailtransporter=  nodemail.createTransport({
            service:"gmail",
            auth:{
             user:"docai.service@gmail.com",
             pass:"mbkrgbjzazhnsija"


        }})
        let details={
            from:"docai.service@gmail.com"
            ,to:"20pa1a5414@vishnu.edu.in"
            ,subject:"hello this is docai service"
            ,text:"thank you seeing our mail",
            
        }
        mailtransporter.sendMail(details,(err)=>{
            if(err){
                console.log("it has an error",err)
            }
            else{
                console.log("mail successfully done") 
            }

        })
        // console.log(req.params.id);
       
        // console.log(detbyid)
        return res.status(200).json({detbyid})
       
    }catch(error) {
        return res.status(404).json({message: error.message});
    }
}
const rejectRequest=async(req,res)=>{
try {
    const {description,email}=req.body;

    
} catch (error) {
    
}
}






module.exports={createform,getallforminfo,getforminfo, getAllRequests, postRequest, getRequestById};

