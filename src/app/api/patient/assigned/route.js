import {NextResponse} from 'next/server';
import connect from '@/backend/config/db';
import env from '@/backend/config/env';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Patient from '@/backend/model/Patient';
import AssignDoc from '@/backend/model/AssignDoc';

export const GET = async request => {

  try {
    await connect ();

    const patients = await AssignDoc.find().sort({_id:-1});
    return new NextResponse (
      JSON.stringify ({patients}),
      {status: 200}
    );
  } catch (err) {
    console.log (err);
    return new NextResponse (JSON.stringify ({message: 'Database Error'}), {
      status: 500,
    });
  }
};
