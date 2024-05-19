import mongoose from 'mongoose';

const {Schema} = mongoose;

const AppointmentSchema = new Schema ({
  //   patientId:{type: String,required: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  department: {type: String, required: true},
  physician: {type: String, required: true},
  priority: {type: String, required: true},
  appointmentDate: {type: String, required: true},
  startTime: {type: Date, required: true},
  duration: {type: Date, required: true},
  description: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: null},
});

export default mongoose.models.Appointment ||
  mongoose.model ('Appointment', AppointmentSchema);
