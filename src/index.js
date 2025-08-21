export default {
  async fetch(request) {
    const target = "https://zplay1.in/pb/api/v1/events/matches/4";

    try {
      const response = await fetch(target, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",   // ✅ CORS fixed
          "Access-Control-Allow-Methods": "GET"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed to fetch API" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}
