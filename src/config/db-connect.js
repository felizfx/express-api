import mongoose from "mongoose";

async function connectDatabase() {
  mongoose.connect(process.env.MONGO_URL);

  return mongoose.connection;
}

export const conn = new Promise(async (resolve, reject) => {
  const connection = await connectDatabase()

  connection.on("error", (error) => {
      reject(error)
  });
    
  connection.once("open", (value) => {
      resolve(value)
  });
})

export { connectDatabase };
