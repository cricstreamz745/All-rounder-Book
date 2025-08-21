export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Example API route
    if (url.pathname === "/api/hello") {
      return Response.json({ message: "Hello from Cloudflare Workers 🎉" });
    }

    // Proxy external API (CORS fixed)
    if (url.pathname === "/api/proxy") {
      const target = url.searchParams.get("url");
      if (!target) {
        return Response.json({ error: "Missing ?url=" }, { status: 400 });
      }

      try {
        const res = await fetch(target);
        const data = await res.text();

        return new Response(data, {
          headers: {
            "Content-Type": res.headers.get("content-type") || "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    // Default 404
    return new Response("Not Found", { status: 404 });
  }
};
