import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import User from '@/backend/model/User';
import Appointment from '@/backend/model/Appointment';
import AssignDoc from '@/backend/model/AssignDoc';
import Diagnostic from '@/backend/model/Diagnostic';

export const GET = async (request, { params }) => {
  const {id}=params
  try {
    await connect ();

    const today = new Date();
    today.setHours(0,0,0,0);

    const user = await User.findOne({IdNo:id});

    const appointments = await Appointment.find({physicianId:user._id});
    const assigned = await AssignDoc.find({physician:id});
    const diagnosticRequest = await Diagnostic.find({physicianId:user._id});

    const results ={
        PAppointments: appointments.filter(a => a.status === 'Pending').length,
        CAppointments: appointments.filter(a => a.status === 'Completed').length,
        PPatient: assigned.filter(a => a.status === 'Pending').length,
        CPatient: assigned.filter(a => a.status === 'Completed').length,
        PRequest: diagnosticRequest.filter(a => a.status === 'Pending').length,
        CRequest: diagnosticRequest.filter(a => a.status === 'Completed').length,
    }

    return new NextResponse (
      JSON.stringify ({results}),
      {status: 200}
    );
  } catch (err) {
    console.log (err);
    return new NextResponse (JSON.stringify ({message: 'Database Error'}), {
      status: 500,
    });
  }
};
