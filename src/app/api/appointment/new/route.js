import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import Appointment from '@/backend/model/Appointment';
import User from '@/backend/model/User';

export const POST = async request => {
  const {
    patientId,
    physician,
    appointmentBy,
    priority,
    appointmentDate,
    duration,
    startTime,
    description,
  } = await request.json ();

  try {
    await connect ();
    console.log('patientId',patientId)
    let user=await User.findOne({IdNo:physician})
    let user2=await User.findOne({IdNo:appointmentBy})

    const newAppointment = new Appointment ({
      patientId,
      appointmentBy:user2._id,
      physicianId:user._id,
      priority,
      appointmentDate,
      startTime,
      duration,
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
