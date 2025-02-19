import mongoose from "mongoose";

const TaxRecordSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
   },
   investments: {
      type: Number,
      required: true,
   },
   deductions: {
      type: Number,
      required: true,
   },
   otherIncome: {
      type: Number,
      required: true,
   },
   taxableIncome: {
      type: Number,
      required: true,
   },
   taxPayable: { type: Number, required: true },
   date: { type: Date, default: Date.now },
});

const TaxRecord = mongoose.model("TaxRecord", TaxRecordSchema);
export default TaxRecord;
