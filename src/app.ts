import express from "express";
import { ProductRoutes } from "./routes/products.routes";
import { MongoDatabase } from "./data/MongoDatabase";

import mongoose from "mongoose";



const app = express();
const port = 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir archivos estáticos
app.use(express.static("public"))


// Rutas
app.use("/api" , ProductRoutes.rotues);

// Conectar a la base de datos mongo
 MongoDatabase.connect();
 //connect()



app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});


/*
 async function  connect() {
  const urlDb = "mongodb://test:123456@store-app-mongo-db:27017/store-app-db?authSource=admin";

  try {
    await mongoose.connect(urlDb, {
      dbName: "app-store-db",
    })

  } catch (error) {
    console.log(error);
    console.log("Error al conectar a la base de datos");
    throw error
  }
}
*/