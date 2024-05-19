import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import Appointment from '@/backend/model/Appointment';
import User from '@/backend/model/User';

export const POST = async request => {
  const {
    patientId,
    department,
    physician,
    priority,
    appointmentDate,
    duration,
    startTime,
    description,
  } = await request.json ();

  try {
    await connect ();

    let dep=department;
    if(department===''){
      let user=await User.findOne({IdNo:physician})
      dep=user.department
    }

    const newAppointment = new Appointment ({
      patientId,
      department:dep,
      physician,
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
