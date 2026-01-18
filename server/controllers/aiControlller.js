
import openai  from "../configs/ai";

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if(!userContent){
            return res.status(400).json({ message: "Missing fields is required." });
        }

        
        const response = await openai.chat.completions.create({
            model: "gpt-4-nano",
            messages: [
                {  
                    role: "system",
                    content: "You are an expert in resume writing your task is to  enhance professional summaries of a resume. The summary should be 1-2 sentence also highlighting key skills, experience,  achievements,carreer objectives.Make it compact and ATS-0friendly and only return text no options or anything else",
                },
                {
                    role: "user",
                    content: `Enhance the following professional summary for a resume:\n\n${userContent}`,
                },
            ],
            max_tokens: 150,
        });

        const enhancedSummary = response.choices[0].message.content.trim();
        res.status(200).json({ enhancedSummary });
    } catch (error) {

        res.status(500).json({ message: "Failed to enhance professional summary." });
    }
};




export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if(!userContent){
            return res.status(400).json({ message: "Missing fields is required." });
        }

        
        const response = await openai.chat.completions.create({
            model: "gpt-4-nano",
            messages: [
                {  
                    role: "system",
                    content: "You are an expert in resume writing your task is to  enhance professional summaries of a resume. The summary should be 1-2 sentence also highlighting key skills, experience,  achievements,carreer objectives.Make it compact and ATS-0friendly and only return text no options or anything else",
                },
                {
                    role: "user",
                    content: `Enhance the following professional summary for a resume:\n\n${userContent}`,
                },
            ],
            max_tokens: 150,
        });

        const enhancedSummary = response.choices[0].message.content.trim();
        res.status(200).json({ enhancedSummary });
    } catch (error) {

        res.status(500).json({ message: "Failed to enhance professional summary." });
    }
};