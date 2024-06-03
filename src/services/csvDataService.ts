import axios from "axios";
import CaseModel from "../models/case";
import LoggerModel from "../models/logger";
import xlsx from "xlsx";
export class DataImportService {
  public csvUrl: string;

  constructor(csvUrl: string) {
    this.csvUrl = csvUrl;
  }

  public async importData(): Promise<void> {
    try {
      const response = await axios.get(this.csvUrl, {
        responseType: "arraybuffer",
      });
      const buf = Buffer.from(response.data);
      const workbook = xlsx.read(buf);
      let sheet1 = workbook.Sheets[workbook.SheetNames[0]];
      let formattedData: any = xlsx.utils.sheet_to_json(sheet1, {
        raw: true,
      });
      let caseData: any = [];
      if (
        formattedData[0]["A"] != "Bank name" ||
        formattedData[0]["B"] != "Property name" ||
        formattedData[0]["C"] != "City" ||
        formattedData[0]["D"] != "Borrower name"
      ) {
        LoggerModel.create({
          type: "INVALID_FORMAT",
          errorData: "invalid csv format",
          createdAt: new Date(),
        });
        return;
      }
      formattedData.map((item: any) => {
        if (item["A"] && item["A"] != "Bank name") {
          caseData.push({
            bankName: item["A"],
            propertyName: item["B"],
            city: item["C"],
            borrowerName: item["D"],
            createdAt: new Date(),
          });
        }
      });
      await CaseModel.insertMany(caseData);
    } catch (error) {
      await LoggerModel.create({
        type: "INTERNAL_SERVER_ERROR",
        errorData: error,
        createdAt: new Date(),
      });
      console.error("Error importing data: ", error);
    }
  }
}
