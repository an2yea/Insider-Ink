import { createHash, randomBytes } from "crypto";

/**
 * Generates a deterministic Ethereum-style wallet address from a website URL.
 * @param url The website URL.
 * @returns A wallet address resembling an Ethereum wallet address.
 */

function generateRandomWalletAddress(): string {
    // Generate 20 random bytes
    const randomValue = randomBytes(20);
  
    // Convert the random bytes to a hexadecimal string and prefix with "0x"
    const walletAddress = `0x${randomValue.toString("hex")}`;
  
    return walletAddress;
  }
  
export function generateWalletAddress(url: string): string {

    if (!url) {
        return generateRandomWalletAddress()
    }
    const normalizedUrl = normalizeUrl(url);

    const hash = createHash("sha256").update(normalizedUrl).digest("hex");

    const walletAddress = `0x${hash.slice(-40)}`;

    return walletAddress;
}

/**
 * Normalizes a URL to ensure consistency.
 * @param url The website URL.
 * @returns A normalized URL.
 */
function normalizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // Ensure consistent protocol and remove trailing slash
    return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname.replace(/\/$/, "")}`;
  } catch (error) {
    throw new Error("Invalid URL");
    }
}