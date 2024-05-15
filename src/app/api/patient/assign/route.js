import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import AssignDoc from '@/backend/model/AssignDoc';

export const POST = async request => {
  const {
    patientId,
    priorty,
    department,
    physician,
  } = await request.json ();

  try {
    await connect ();

    const assignDoc = new AssignDoc ({
      patientId,
      priorty,
      department,
      physician,
    });
    await assignDoc.save ();

    return new NextResponse (
      JSON.stringify ({message: 'Physician Assigined Succesfully'}),
      {status: 200}
    );
  } catch (err) {
    console.log (err);
    return new NextResponse (JSON.stringify ({message: 'Database Error'}), {
      status: 500,
    });
  }
};
