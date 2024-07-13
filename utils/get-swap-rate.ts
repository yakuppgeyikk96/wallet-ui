export default async function getSwapRate(from: string, to: string) {
  const jupPriceApiUrl = process.env.NEXT_PUBLIC_JUP_PRICE_API_URL;

  try {
    const response = await fetch(
      `${jupPriceApiUrl}/price?ids=${from}&vsToken=${to}`
    );

    if (response.ok) {
      const { data } = await response.json();
      if (data && data[from]) {
        return data[from].price;
      }
    }
    return undefined;
  } catch (error) {
    console.error("Failed to fetch swap rate", error);
  }
}
