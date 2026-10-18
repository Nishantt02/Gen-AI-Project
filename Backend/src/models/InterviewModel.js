import mongoose from "mongoose";

export const technicalquestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answers: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
});


export const behavioralquestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answers: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
});

export const skillsSchema=new mongoose.Schema({
    skills:{
        type:String,
        required:[true,"skills are required"]
    },
    severity:{
        type:String,
        required:[true,"severity is required"],
        enum:["low","medium","high"]
    }
},{
    _id:false
})

export const preparationSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:{
        type:String,
        required:[true,"tasks are required"]
    }
},{
    _id:false
})

export const interviewSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume: {
        type: String,
        required: [true, "resume is required"]
    },
    selfdescription: {
        type: String,
        required: [true, "self description is required"]
    },
    technicalQuestions: [technicalquestionSchema],
    behavioralQuestions: [behavioralquestionSchema],
    skillGaps: [skillsSchema],
    preparationPlan: [preparationSchema] ,
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    }   

}, {
    
});

const Interview=mongoose.model("Interview", interviewSchema);
export default Interview;