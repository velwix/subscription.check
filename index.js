export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const url = new URL(request.url);
    const providedApiKey = url.pathname.split('/')[1];

    if (providedApiKey !== env.API_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    try {
      const { user_id, channels } = await request.json();
      const results = {};

      for (const channel of channels) {
        const tgUrl = `https://api.telegram.org/bot${env.BOT_TOKEN}/getChatMember?chat_id=${channel}&user_id=${user_id}`;
        const response = await fetch(tgUrl);
        const data = await response.json();

        if (data.ok) {
          const status = data.result.status;
          results[channel] = ["creator", "administrator", "member"].includes(status);
        } else {
          results[channel] = false;
        }
      }

      return new Response(JSON.stringify({ status: "success", results }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
