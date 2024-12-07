import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { Company } from '@/app/types/company';

export async function POST(request: Request) {
  try {
    const companyData: Company = await request.json();
    const { id, name, posts } = companyData
    if (!id || !name) {
        return NextResponse.json({ error: 'Company ID and name are required' }, { status: 400 });
    }
    const companyDocRef = doc(db, 'companies', id);
    const companyDocSnapshot = await getDoc(companyDocRef)

    if (!companyDocSnapshot.exists()) {

        const newCompanyData: Company = {
            id: id,
            name: name,
            description: '',
            website: '',
            averageRating: 0,
            tags: [],
            logoUrl: '',
            posts: posts || []
        }
        await setDoc(companyDocRef, newCompanyData);
    }
    return NextResponse.json({ success: true, message: 'Company created successfully' });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const companyData: Company = await request.json();
    const companyDocRef = doc(db, 'companies', companyData.id);

    await updateDoc(companyDocRef, {
      name: companyData.name,
      description: companyData.description,
      website: companyData.website,
      averageRating: companyData.averageRating,
      logoUrl: companyData.logoUrl,
      
    });
    return NextResponse.json({ success: true, message: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
  }
}

// Add DELETE method if needed 