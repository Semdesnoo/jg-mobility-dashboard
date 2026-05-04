// Stub — wordt geactiveerd zodra Molibox API key beschikbaar is
export async function POST() {
  return Response.json(
    { error: "Molibox koppeling is nog niet geactiveerd. Voeg MOLIBOX_API_KEY toe aan .env." },
    { status: 503 }
  );
}
