const API_ENDPOINTS = {
  randomUser: "https://randomuser.me/api/"
};

const ADVENTURE_USERS = [
  { id: 1, name: "Maya Torres", email: "maya@adventurepark.com", address: { city: "Riverbend" }, company: { name: "Park Operations" } },
  { id: 2, name: "Jordan Chen", email: "jordan@adventurepark.com", address: { city: "Lakeview" }, company: { name: "Guest Experience" } },
  { id: 3, name: "Alicia Brooks", email: "alicia@adventurepark.com", address: { city: "Cedar Point" }, company: { name: "Safety Team" } },
  { id: 4, name: "Leo Martin", email: "leo@adventurepark.com", address: { city: "North Ridge" }, company: { name: "Ride Maintenance" } }
];

const ADVENTURE_POSTS = [
  { id: 1, title: "New family coaster opens this weekend", body: "The Summit Sprint brings a faster, brighter ride experience for first-time thrill seekers and returning fans alike." },
  { id: 2, title: "Water park hours extended for summer", body: "Guests can enjoy extra evening access to the lazy river, splash zones, and sunset slides every Friday." },
  { id: 3, title: "Safety training for every team member", body: "Our crew completed refreshed ride and guest-care training before the busy holiday season began." },
  { id: 4, title: "Check out the new picnic garden", body: "A shaded seating area with live music and quick-service snacks is now open near the main gate." }
];

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function getUsers() {
  return ADVENTURE_USERS;
}

async function getPosts() {
  return ADVENTURE_POSTS;
}

async function getRandomUserImages(count) {
  const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 1;
  const data = await fetchJson(`${API_ENDPOINTS.randomUser}?results=${safeCount}&inc=picture&noinfo`);
  return data.results.map((result) => result.picture.large);
}
