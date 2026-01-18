import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";


export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {title}= req.body;

        const newResume = await Resume.create({
            userId,
            title,
        });

   
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
};


export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId}= req.params;
       await Resume.findOneAndDelete({userId,_id:resumeId});
   
        return res.status(201).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
};


export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId}= req.params;
        const resume= await Resume.findOne({userId,_id:resumeId});
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;
        return res.status(201).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
};

export const getPublicResumeById = async (req, res) => {
    try {
        const {resumeId}= req.params;
        const resume= await Resume.findOne({_id:resumeId,public:true});
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;
        return res.status(201).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
};

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId,resumeData,removeBackground}= req.body;
        const image = req.file;
        if(image){
            const imageBufferData=fs.createWriteStream(image.path);

            const response = await imagekit.files.upload({
            file: imageBufferData,
            fileName: 'resume.png',
            folder:"user-resumes",
            transformation:{
                pre:'w-300,h-400,fo-face,z-0.75'+(removeBackground?',e-bgremove':'')
            }
            });
            resumeDataCopy.personal_info.image=response.url;
        }
        const resumeDataCopy= JSON.parse(resumeData);

        const resume= await Resume.findOneAndUpdate(
            {userId,_id:resumeId},
            resumeDataCopy,{new:true}          
        );
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        return res.status(201).json({ message: "Resume updated successfully",resume });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
};