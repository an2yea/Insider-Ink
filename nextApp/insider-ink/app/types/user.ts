import { Company } from "./company";

export interface User {
    id: string;
    username: string;
    email: string;
    walletAddress: string;
    company: Company;
}