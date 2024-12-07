import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { Company } from '@/app/types/company';

export async function POST(request: Request) {
  try {
    const companyData: Company = await request.json();
    const companyDocRef = doc(db, 'companies', companyData.id);

    await setDoc(companyDocRef, companyData);
    return NextResponse.json({ success: true, message: 'Company created successfully' });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const companyData: Partial<Company> & { posts?: string[] } = await request.json();
    const companyDocRef = doc(db, 'companies', companyData.id);

    // Prepare the update data, only including fields that are present
    const updateData: Partial<Company> & { posts?: string[] } = {};
    if (companyData.name !== undefined) updateData.name = companyData.name;
    if (companyData.description !== undefined) updateData.description = companyData.description;
    if (companyData.website !== undefined) updateData.website = companyData.website;
    if (companyData.averageRating !== undefined) updateData.averageRating = companyData.averageRating;
    if (companyData.logoUrl !== undefined) updateData.logoUrl = companyData.logoUrl;
    if (companyData.posts !== undefined) updateData.posts = companyData.posts;

    await updateDoc(companyDocRef, updateData);
    return NextResponse.json({ success: true, message: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
  }
}

// Add DELETE method if needed 