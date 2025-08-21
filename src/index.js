export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing ?url= parameter", { status: 400 });
    }

    try {
      const resp = await fetch(target);
      return new Response(resp.body, {
        status: resp.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": resp.headers.get("content-type") || "text/plain"
        }
      });
    } catch (err) {
      return new Response("Error fetching: " + err.message, { status: 500 });
    }
  }
};
