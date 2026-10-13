import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/config/database.js'
dotenv.config()
import invokeGeminiAI from './src/service/ai.service.js';  

connectDB();
    
 await invokeGeminiAI();

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})