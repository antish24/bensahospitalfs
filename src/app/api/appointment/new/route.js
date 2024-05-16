import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import Appointment from '@/backend/model/Appointment';

export const POST = async request => {
  const {
    patientId,
    department,
    physician,
    priority,
    appointmentDate,
    description,
  } = await request.json ();

  try {
    await connect ();

    const newAppointment = new Appointment ({
      patientId,
      department,
      physician,
      priority,
      appointmentDate,
      description,
    });
    await newAppointment.save ();

    return new NextResponse (
      JSON.stringify ({message: 'Appointment Created Succesfully'}),
      {status: 200}
    );
  } catch (err) {
    console.log (err);
    return new NextResponse (JSON.stringify ({message: 'Database Error'}), {
      status: 500,
    });
  }
};
