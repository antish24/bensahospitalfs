import mongoose from 'mongoose';

const {Schema} = mongoose;

const TreatmentSchema = new Schema ({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  physicianId:{type: String,required: true },

  visitType: {type: String, required: true},
  complaint: {type: String, required: true},
  presentIllness: {type: String, required: true},
  pastMedicalHistory: {type: String, required: true},
  familyHistory: {type: String, required: true},
  socialHistory: {type: String, required: true},
  reviewOfSystems: {type: String, required: true},
  emotional: {type: String, required: true},
  
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: null},
});

export default mongoose.models.Treatment ||
  mongoose.model ('Treatment', TreatmentSchema);
