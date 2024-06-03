import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import { DataImportService } from "./src/services/csvDataService";
import casesRoutes from "./src/routes/case";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/cases", casesRoutes);
const CLUSTER_URL = process.env.CLUSTER_URL as string;

mongoose.connect(CLUSTER_URL, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const csvUrl = process.env.CSV_URL as string;
const dataImportService = new DataImportService(csvUrl);

cron.schedule("0 10,17 * * *", () => {
  dataImportService.importData();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
