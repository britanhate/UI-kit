export function createArcgisFormPostRequest(body: URLSearchParams): RequestInit {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  };
}
