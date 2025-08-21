export default {
  async fetch(request) {
    const target = "https://zplay1.in/pb/api/v1/events/matches/4";

    // Handle preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    try {
      const response = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0",   // Pretend browser
          "Accept": "application/json"   // Force JSON
        }
      });

      const text = await response.text(); // read raw
      let data;

      try {
        data = JSON.parse(text); // try parse JSON
      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid JSON", raw: text }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed to fetch API", message: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}
