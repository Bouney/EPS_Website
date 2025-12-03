export async function onRequest(context) {
  const { method, url, headers } = context.request;
  const dest = new URL(url).searchParams.get("api");

  if (!['a', 'msg'].includes(dest)) {
    console.log(dest)
    return new Response("Huh?", {
            status: 400,
    });
  }

  const destUrl = 'https://elginpark.appazur.com/api/' + dest;

  if (
    method === "OPTIONS" &&
    headers.has("Origin") &&
    headers.has("Access-Control-Request-Method")
  ) {
    const responseHeaders = {
      "Access-Control-Allow-Origin": headers.get("Origin"),
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": headers.get(
        "Access-Control-Request-Headers"
      ),
      "Access-Control-Max-Age": "86400",
    };
    return new Response(null, { headers: responseHeaders });
  }

  const proxyRequest = new Request(destUrl, {
    method,
    headers: {
      ...headers,
      Origin: "",
    },
  });

  const response = await fetch(proxyRequest);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*")
  responseHeaders.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  responseHeaders.set("Cache-Control", "no-cache");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
