import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { Company } from '@/app/types/company';

export async function POST(request: Request) {
  try {
    const companyData: Company = await request.json();

    // Validate required fields
    if (!companyData.id || !companyData.name) {
      return NextResponse.json({ error: 'Company ID and name are required' }, { status: 400 });
    }

    // Add the new company to the 'companies' collection
    await addDoc(collection(db, 'companies'), {
      id: companyData.id,
      name: companyData.name,
      description: companyData.description || '',
      website: companyData.website || '',
      averageRating: companyData.averageRating || 0,
      logoUrl: companyData.logoUrl || '',
      tags: companyData.tags || [],
    });

    return NextResponse.json({ success: true, message: 'Company created successfully' });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}