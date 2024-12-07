import { Company } from "./company";

export interface User {
    id: string;
    username: string;
    email: string;
    walletAddress: string;
    companyId: string | null;
    companyName: string | null;
}