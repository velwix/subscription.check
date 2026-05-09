export default {
  async fetch(request, env) {

    
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const url = new URL(request.url);
    const providedApiKey = url.pathname.split('/')[1];

    if (providedApiKey !== env.API_KEY) {
      return json({ error: "Unauthorized" }, 403);
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

      return json({ status: "success", results });

    } catch (err) {
      return json({ error: "Invalid request" }, 400);
    }
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}