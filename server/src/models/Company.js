import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  industry: { type: String },
});

export default mongoose.model("Company", CompanySchema);
