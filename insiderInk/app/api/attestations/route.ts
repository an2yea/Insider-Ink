import { addDoc } from "firebase/firestore"
import { db } from "@/src/firebase/config"
import { collection } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    try {   
        const { title, content, userId, username, companyId, companyName, blockHash } = await request.json()

        if (!title || !content || !userId || !username || !companyId || !companyName || !blockHash) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        await addDoc(collection(db, 'attestations'), {
            title: title,
            content: content,
            userId: userId,
            username: username,
            companyId: companyId,
            companyName: companyName,
            blockHash: blockHash
        })

        return NextResponse.json({ message: "Attestation created" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error creating attestation" }, { status: 500 })
    }
}       