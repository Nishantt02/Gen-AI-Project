import "dotenv/config";
import app from './src/app.js'
import connectDB from './src/config/database.js'
connectDB();
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
