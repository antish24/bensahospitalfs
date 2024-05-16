import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import Appointment from '@/backend/model/Appointment';

export const GET = async (request, { params }) => {
  const {id}=params
  try {
    await connect ();

    const appointment = await Appointment.find().populate('patientId', 'IdNo fullName sex dateOfBirth').sort({_id:-1});

    const appointments= appointment.map(doc => {
      return {
        fullName: doc.patientId.fullName,
        IdNo: doc.patientId.IdNo,
        priority: doc.priority,
        appointmentDate: doc.appointmentDate,
        description: doc.description,
        department: doc.department,
        physician: doc.physician,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }
    });

    return new NextResponse (
      JSON.stringify ({appointments}),
      {status: 200}
    );
  } catch (err) {
    console.log (err);
    return new NextResponse (JSON.stringify ({message: 'Database Error'}), {
      status: 500,
    });
  }
};
