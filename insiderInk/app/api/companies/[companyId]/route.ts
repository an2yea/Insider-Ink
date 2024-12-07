import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

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