import crypto from "crypto-js";

export default function decryptData(
  encryptedData: string,
  encryptionKey: string
) {
  try {
    return crypto.AES.decrypt(encryptedData, encryptionKey).toString(
      crypto.enc.Utf8
    );
  } catch (error) {
    console.error(error);
  }
}
