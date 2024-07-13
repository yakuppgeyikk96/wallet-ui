export default function parseKeypairJson(keypairJson: string) {
  try {
    const parsedData = JSON.parse(keypairJson);
    return parsedData ? parsedData._keypair : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
