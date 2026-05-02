const BASE_URL = "http://20.207.122.201/evaluation-service";

const AUTH_PAYLOAD = {
  email: "nk8644@srmist.edu.in",
  name: "nishanth",
  rollNo: "ra2311026010696",
  accessCode: "QkbpxH",
  clientID: "40a85ffd-0bf0-44e6-9149-8ea75ff39c4d",
  clientSecret: "usbbpNryNGNrrbaC"
};

let authToken = null;

async function refreshToken() {
  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AUTH_PAYLOAD)
    });
    const data = await res.json();
    authToken = data.access_token;
  } catch (err) {
    // silent
  }
}

async function Log(stack, level, pkg, message) {
  const validStacks = ["frontend", "backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validFrontendPkgs = ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];

  if (!validStacks.includes(stack) || !validLevels.includes(level)) return;
  if (stack === "frontend" && !validFrontendPkgs.includes(pkg)) return;

  if (!authToken) await refreshToken();

  try {
    const res = await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    if (res.status === 401) {
      await refreshToken();
      return Log(stack, level, pkg, message);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // silent fail
  }
}

module.exports = { Log, refreshToken, getToken: () => authToken };