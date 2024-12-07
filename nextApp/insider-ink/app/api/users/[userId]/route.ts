import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
  ) {
    const userId = (await params).userId;
    console.log(await params)
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
  
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(userDoc.data(), { status: 200 });
  }
  
  export async function PUT(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
  ) {
    const userId  = ((await params).userId);
    const { walletAddress } = await req.json();
    if (!userId || !walletAddress) {
      return NextResponse.json({ error: 'Missing userId or walletAddress' }, { status: 400 });
    }
  
    const userDocRef = doc(db, 'users', userId);
    try {
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
      console.log("User not found", userId)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      await updateDoc(userDocRef, { walletAddress });
      console.log("Wallet address updated successfully", userId)
      return NextResponse.json({ message: 'Wallet address updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating wallet address:', error);
      return NextResponse.json({ error: 'Failed to update wallet address' }, { status: 500 });
    }
  }