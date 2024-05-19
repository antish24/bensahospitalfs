import mongoose from 'mongoose';

const {Schema} = mongoose;

const PrescriptionSchema = new Schema ({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  physicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
//   medications: {type: String, required: true},
  medications: [{
    name: {type: String, required: true},
    dosage: {type: String, required: true},
    instruction: {type: String, required: true},
    strength: {type: String, required: true},
    quantity: {type: String, required: true},
  }],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: null},
});

export default mongoose.models.Prescription ||
  mongoose.model ('Prescription', PrescriptionSchema);
