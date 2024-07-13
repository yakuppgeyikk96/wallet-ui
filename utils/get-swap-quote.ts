export default async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number
) {
  const quoteApiUrl = process.env.NEXT_PUBLIC_JUP_QUOTE_API_URL;
  try {
    const response = await fetch(
      `${quoteApiUrl}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
