export async function fetchLiveFinancialRates() {
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:63336";

  const backendResponse = await fetch(`/api/conversion/rates`);
  if (!backendResponse.ok) {
    throw new Error("Data not available");
  }
  const data = await backendResponse.json();
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Data not available");
  }
  return data;
}
