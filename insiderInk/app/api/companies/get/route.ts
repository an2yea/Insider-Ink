import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const companiesCollection = collection(db, 'companies');
    const companiesSnapshot = await getDocs(companiesCollection);
    const companiesList = companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(companiesList, { status: 200 });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}
