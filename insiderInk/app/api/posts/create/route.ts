import { NextResponse } from 'next/server'
import { db } from '@/src/firebase/config'
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore'
import { Post } from '@/app/types/posts'

interface PostRequest {
  title: string
  content: string
  media: File | null
  userId: string
  companyName: string
  companyId: string
}

export async function POST(request: Request) {
  try {
    console.log("Received POST request");

    const reqData: PostRequest = await request.json()

    const { title, content, media, userId, companyName, companyId } = reqData

    console.log("Form data extracted:", { title, content, userId, companyName, companyId });

    if (!userId) {
      console.warn("Unauthorized access attempt");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log("mediaFile", media);
    // let mediaUrl = null
    // if (mediaFile) {
    //   // Upload media to Firebase Storage
    //   const storageRef = ref(storage, `posts/${userId}/${Date.now()}-${mediaFile.name}`)
    //   const mediaBuffer = await mediaFile.arrayBuffer()
    //   await uploadBytes(storageRef, mediaBuffer)
    //   mediaUrl = await getDownloadURL(storageRef)
    //   console.log("Media uploaded, URL:", mediaUrl);
    // }

    // Create post document in Firestore
    const postData: Post = {
      title: title,
      content: content,
      mediaUrl: "",
      userId: userId,
      companyId: companyId,
      companyName: companyName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("Post data prepared:", postData);

    try {
      const docRef = await addDoc(collection(db, 'posts'), postData)
      console.log("Post document created with ID:", docRef.id);

      // // Update user document with post ID
      // const userDoc = await getDoc(doc(db, 'users', userId))
      // if (userDoc.exists()) {
      //   const userData = userDoc.data()
      //   const userPosts = userData.posts || []
      //   userPosts.push(docRef.id)
      //   await updateDoc(doc(db, 'users', userId), { posts: userPosts })
      //   console.log("User document updated with new post ID");
      // } else {
      //   console.warn("User document not found for ID:", userId);
      // }

      // Update company document with post ID
      // const companyDoc = await getDoc(doc(db, 'companies', postData.companyId))
      // if (companyDoc.exists()) {
      //   console.log("Company document found, updating with new post ID");
      //   const companyAddPostURL = `${process.env.NEXT_PUBLIC_API_URL}/api/companies/add-post`
      //   await fetch(companyAddPostURL, {
      //     method: 'PUT',
      //     body: JSON.stringify({ companyId: postData.companyId, postId: docRef.id }),
      //   })
      // }

      return NextResponse.json({
        success: true,
        postId: docRef.id,
      }, { status: 200 })
    } catch (error) {
      console.error('Error creating post:', error)
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 