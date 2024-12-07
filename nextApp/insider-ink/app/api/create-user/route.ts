import { NextRequest, NextResponse } from "next/server"
import { db } from "@/src/firebase/config"
import { doc, collection, getDoc, setDoc } from "firebase/firestore"
import { User } from "@/app/types/user"
import { Company } from "@/app/types/company";
import { cookies } from "next/headers";

interface CreateUserRequest{
    id: string;
    email: string;
    username: string;
    walletAddress: string;
    company: Company | null;
}

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json() as CreateUserRequest;
        const { id, email, username, walletAddress, company } = userData;

        if (!id || !email || !username || !walletAddress) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const userDoc = doc(collection(db, "users"), id);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const user: User = {
            id,
            email,
            username,
            walletAddress,
            company,
        }

        await setDoc(userDoc, user);

        (await cookies()).set('firebase-token', userData.id, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
          });
        

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}