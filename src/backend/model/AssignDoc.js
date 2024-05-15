import mongoose from "mongoose";

const { Schema } = mongoose;

const AssignDocSchema = new Schema({
  patientId:{type: String,required: true },
  // patientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  priorty: { type: String,required:true },
  department: { type: String,required:true},
  physician: { type: String,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export default mongoose.models.AssignDoc || mongoose.model("AssignDoc", AssignDocSchema);