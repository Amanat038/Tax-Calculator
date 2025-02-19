import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import TaxRecord from "./models/TaxRecord.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mongoDb  Connection

mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));

const calculateTax = (taxableIncome) => {
   if (taxableIncome <= 250000) {
      return 0;
   } else if (taxableIncome > 250000 && taxableIncome <= 500000) {
      return (taxableIncome - 250000) * 0.05;
   } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
      return 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
   } else {
      return 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
   }
};



// POST
app.post("/api/taxData", async (req, res) => {
   try {
      const { income, investments, deductions, otherIncome, userId } = req.body;

      const standardDeduction = 50000;

      // calculate Taxable income
      const taxableIncome =
         income + otherIncome - (investments + deductions + standardDeduction);

      
      const finalTaxableIncome = Math.max(0, taxableIncome);
      const taxPayable = calculateTax(finalTaxableIncome);
      const taxRecord = new TaxRecord({
         userId,
         income,
         investments,
         deductions,
         taxPayable,
         otherIncome,
         taxableIncome,
      });

      await taxRecord.save();
      res.status(200).json({ message: "Success", data: taxRecord });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// GET
app.get("/api/taxResult", async (req, res) => {
   const { userId } = req.query;

   if (!userId) {
      return res.status(400).json({ error: "id is required" });
   }
   try {
      const records = await TaxRecord.findOne({ userId })
         .sort({ date: -1 })
         .exec();

      if (!records) {
         return res.status(404).json({ error: "No records found" });
      }
      res.status(200).json(records);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
