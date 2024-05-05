import mongoose from "mongoose";


const urlDb = 
"mongodb://test:123456@store-app-mongo-db:27017/store-app-db?authSource=admin";

export class MongoDatabase {

    static async connect() {
  
      try {
        await mongoose.connect(urlDb, {
          dbName: "app-store-db",
        })

        console.log("Conectado a la base de datos");
  
      } catch (error) {
        console.log(error);
        console.log("Error al conectar a la base de datos");
        throw error
      }
    }
  }
  