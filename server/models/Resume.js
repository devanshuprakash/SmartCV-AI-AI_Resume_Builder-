import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,default:'My Resume'},
    public:{type:Boolean,default:false},
    accent_color:{type:String,default:'#000000'},
    professional_summary:{type:String,default:''},
    skills:[{type:String}],
    personal_info:{
        full_name:{type:String,default:""},
        email:{type:String,default:""},
        phone:{type:String,default:""},
        address:{type:String,default:""},
    education:[{    x
        institution:{type:String,default:""},
        degree:{type:String,default:""},
        start_date:{type:Date},
        end_date:{type:Date},
        description:{type:String,default:""}
    }],