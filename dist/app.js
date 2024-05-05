"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_routes_1 = require("./routes/products.routes");
const MongoDatabase_1 = require("./data/MongoDatabase");
const app = (0, express_1.default)();
const port = 3000;
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Servir archivos estáticos
app.use(express_1.default.static("public"));
// Rutas
app.use("/api", products_routes_1.ProductRoutes.rotues);
// Conectar a la base de datos mongo
MongoDatabase_1.MongoDatabase.connect();
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
