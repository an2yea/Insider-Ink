import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const postsCollection = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCollection);
    const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(postsList, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}