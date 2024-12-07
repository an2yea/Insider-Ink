import { NextResponse } from 'next/server'
import { db } from '@/src/firebase/config'
import { collection, addDoc, serverTimestamp, getDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Post } from '@/app/types/posts'
import { Company } from '@/app/types/company'

export async function POST(request: Request) {
  try {
   
    const formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('text') as string
    const mediaFile = formData.get('media') as File | null
    const userId = formData.get('authorId') as string
    const companyName = formData.get('companyName') as string
    const companyId = formData.get('companyId') as string

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // let mediaUrl = null
    // if (mediaFile) {
    //   // Upload media to Firebase Storage
    //   const storageRef = ref(storage, `posts/${userId}/${Date.now()}-${mediaFile.name}`)
    //   const mediaBuffer = await mediaFile.arrayBuffer()
    //   await uploadBytes(storageRef, mediaBuffer)
    //   mediaUrl = await getDownloadURL(storageRef)
    // }

    // Create post document in Firestore
    const postData: Post = {
      title: title,
      content: content,
      mediaUrl: "",
      authorId: userId,
      companyId: companyId,
      companyName: companyName,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), postData)

      // Update user document with post ID
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userPosts = userData.posts || []
        userPosts.push(docRef.id)
        await updateDoc(doc(db, 'users', userId), { posts: userPosts })
      }

      // Update company document with post ID
      const companyDoc = await getDoc(doc(db, 'companies', postData.companyId))
      if (!companyDoc.exists()) {
        await fetch(`/api/companies/create`, {
          method: 'POST',
          body: JSON.stringify({ companyId: postData.companyId, companyName: postData.companyName, posts: [docRef.id] }),
        })
      } else {
        await fetch(`/api/companies/add-post`, {
          method: 'PUT',
          body: JSON.stringify({ companyId: postData.companyId, postId: docRef.id }),
        })
      }

      return NextResponse.json({ 
        success: true, 
        postId: docRef.id,
        user: userDoc.data(),
        company: companyDoc.data(),
      })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' }, 
      { status: 500 }
    )
  }
} 