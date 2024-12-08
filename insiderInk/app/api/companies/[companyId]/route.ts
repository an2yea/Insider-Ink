import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const companyId = (await params).companyId;

  if (!companyId) {
    return NextResponse.json({ error: 'Missing companyId' }, { status: 400 });
  }

  const companyDocRef = doc(db, 'companies', companyId);
  const companyDoc = await getDoc(companyDocRef);

  if (!companyDoc.exists()) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  const companyData = companyDoc.data();
  return NextResponse.json(companyData, { status: 200 });
}


export async function PATCH(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
    const companyId = (await params).companyId;
    
    if (!companyId) {
        return NextResponse.json({ error: 'Missing companyId' }, { status: 400 });
    }

    const companyDocRef = doc(db, 'companies', companyId);
    const companyDoc = await getDoc(companyDocRef);

    if (!companyDoc.exists()) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updatedData = await req.json();

    try {
      await updateDoc(companyDocRef, updatedData);
      return NextResponse.json({ message: 'Company updated successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
    }
}