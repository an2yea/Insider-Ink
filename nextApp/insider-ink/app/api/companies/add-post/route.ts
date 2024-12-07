import { NextResponse } from 'next/server';
import { db } from '@/src/firebase/config';
import { doc, runTransaction } from 'firebase/firestore';

export async function PUT(request: Request) {
  try {
    const { companyId, postId } = await request.json();

    if (!companyId || !postId) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const companyDocRef = doc(db, 'companies', companyId);

    await runTransaction(db, async (transaction) => {
      const companyDoc = await transaction.get(companyDocRef);
      if (!companyDoc.exists()) {
        throw new Error('Company does not exist');
      }

      const companyData = companyDoc.data();
      const companyPosts = companyData.posts || [];
      companyPosts.push(postId);

      transaction.update(companyDocRef, { posts: companyPosts });
    });

    return NextResponse.json({ success: true, message: 'Post added to company successfully' });
  } catch (error) {
    console.error('Error adding post to company:', error);
    return NextResponse.json({ error: 'Failed to add post to company' }, { status: 500 });
  }
}

