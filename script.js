const pages = [
  { title: "Home", url: "index.html", keywords: "home digital content creator front page navbar body footer" },
  { title: "Tools", url: "Pages/tools.html", keywords: "tools seo hashtag title generator shorts planner thumbnail content calendar" },
  { title: "Developer", url: "Pages/developer.html", keywords: "developer nandeshwar mern stack frontend javascript portfolio freelance job" },
  { title: "Learn More", url: "Pages/learn-more.html", keywords: "learn more creator growth guide publish content hook seo" },
  { title: "Affiliate", url: "Pages/affiliate.html", keywords: "affiliate marketing earning commission product promotion links content" },
];

const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
document.getElementById("year").textContent = new Date().getFullYear();
// const year = document.getElementById("year");
// if (year) year.textContent = new Date().getFullYear();

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Reveal animation on scroll
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

// Animated counters
function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value + (target === 100 ? "%" : target === 96 ? "%" : "+");
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });
counters.forEach((counter) => counterObserver.observe(counter));

// Search with page suggestions
const searchInput = document.getElementById("siteSearch");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

function renderSearchResults() {
  if (!searchInput || !searchResults) return;
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    return;
  }
  const matches = pages.filter(page =>
    page.title.toLowerCase().includes(query) || page.keywords.includes(query)
  );
  searchResults.innerHTML = matches.length
    ? matches.map(page => `<a href="${page.url}">${page.title}</a>`).join("")
    : `<a href="learn-more.html">No exact match. Open Learn More</a>`;
  searchResults.style.display = "block";
}

function goToFirstResult() {
  const first = searchResults?.querySelector("a");
  if (first) window.location.href = first.getAttribute("href");
}

searchInput?.addEventListener("input", renderSearchResults);
searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") goToFirstResult();
});
searchBtn?.addEventListener("click", () => {
  renderSearchResults();
  goToFirstResult();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-box") && searchResults) searchResults.style.display = "none";
});

// Tool generator
const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const generatedOutput = document.getElementById("generatedOutput");

generateBtn?.addEventListener("click", () => {
  const topic = topicInput.value.trim() || "digital content creation";
  const cleanTopic = topic.replace(/\s+/g, " ");
  const title = `How to master ${cleanTopic} with smart creator workflow`;
  const hashtags = cleanTopic
    .split(" ")
    .filter(Boolean)
    .slice(0, 5)
    .map(word => `#${word.replace(/[^a-z0-9]/gi, "")}`)
    .join(" ");

  generatedOutput.innerHTML = `
    <strong>Title:</strong> ${title}<br>
    <strong>Description line:</strong> Learn the easiest way to create, optimize, and publish ${cleanTopic} content faster.<br>
    <strong>Hashtags:</strong> ${hashtags} #ContentCreator #DigitalCreator #Growth
  `;
});

// Accordion
const accordionButtons = document.querySelectorAll(".accordion-btn");
accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    accordionButtons.forEach(item => {
      if (item !== button) item.classList.remove("open");
    });
    button.classList.toggle("open");
  });
});

// Card spotlight effect
const spotlightCards = document.querySelectorAll(".feature-card, .learn-card");
spotlightCards.forEach(card => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  });
});

// Brand magnetic micro-interaction
const magneticItems = document.querySelectorAll(".magnetic");
magneticItems.forEach(item => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});


// YouTube muted autoplay loop player
// Goal: no manual add/remove. The website fetches the channel's latest public uploads
// from YouTube RSS through a free JSON proxy, then plays every video one by one.
// New public uploads appear automatically whenever the site is opened/refreshed.
const CREATOR_YOUTUBE_CHANNEL_ID = "UCzxpUkSJjWvFqvvDOSSu3nQ"; // @AICloudeTech00
const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CREATOR_YOUTUBE_CHANNEL_ID}`;
const RSS_JSON_PROXY_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YOUTUBE_RSS_URL)}`;

// Backup list only runs if YouTube RSS/proxy is temporarily unavailable.
// The main system still auto-fetches new uploads, so you normally never edit this.
const FALLBACK_CREATOR_VIDEO_IDS = [
  "SJMNNE3JSio",
  "5W0Zp0enugE",
  "HZKgHMA3t6U",
  "nDzVKh-ET4E",
  "pJbKKeMnl5A",
  "MC9T5M2s3HM",
  "HEy3xulh_1o",
  "3YoX-xsWng0"
];

let creatorYoutubePlayer;
let creatorVideoIds = [];
let creatorCurrentIndex = 0;
let playerRetryTimer;
let playerRefreshTimer;
let playerErrorCount = 0;

function setupYoutubeFallback(message) {
  const box = document.getElementById("youtubeCreatorPlayer");
  if (!box) return;
  box.innerHTML = `<div class="youtube-message">${message}</div>`;
}

function extractYoutubeVideoId(item) {
  const fields = [item?.guid, item?.link, item?.id].filter(Boolean).join(" ");
  const patterns = [
    /yt:video:([a-zA-Z0-9_-]{6,})/,
    /watch\?v=([a-zA-Z0-9_-]{6,})/,
    /shorts\/([a-zA-Z0-9_-]{6,})/,
    /embed\/([a-zA-Z0-9_-]{6,})/
  ];

  for (const pattern of patterns) {
    const match = fields.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function uniqueVideoIds(ids) {
  return [...new Set(ids.filter(Boolean))];
}

async function fetchLatestChannelVideoIds() {
  const response = await fetch(RSS_JSON_PROXY_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to read YouTube RSS feed");

  const data = await response.json();
  const ids = uniqueVideoIds((data.items || []).map(extractYoutubeVideoId));
  if (!ids.length) throw new Error("No public videos found in YouTube feed");
  return ids;
}

async function loadCreatorVideos() {
  setupYoutubeFallback("Loading latest channel videos...");
  try {
    creatorVideoIds = await fetchLatestChannelVideoIds();
  } catch (error) {
    console.warn("YouTube auto fetch failed, using backup list:", error);
    creatorVideoIds = uniqueVideoIds(FALLBACK_CREATOR_VIDEO_IDS);
  }
  return creatorVideoIds;
}

function forceSilentAutoplay() {
  if (!creatorYoutubePlayer || typeof creatorYoutubePlayer.getPlayerState !== "function") return;

  creatorYoutubePlayer.mute();
  try { creatorYoutubePlayer.setVolume(0); } catch (_) {}

  const state = creatorYoutubePlayer.getPlayerState();
  if ([YT.PlayerState.PAUSED, YT.PlayerState.CUED, YT.PlayerState.UNSTARTED].includes(state)) {
    creatorYoutubePlayer.playVideo();
  }
}

function playVideoAtIndex(index) {
  if (!creatorYoutubePlayer || !creatorVideoIds.length) return;
  creatorCurrentIndex = ((index % creatorVideoIds.length) + creatorVideoIds.length) % creatorVideoIds.length;
  playerErrorCount = 0;
  creatorYoutubePlayer.mute();
  creatorYoutubePlayer.loadVideoById({ videoId: creatorVideoIds[creatorCurrentIndex], startSeconds: 0 });
  setTimeout(forceSilentAutoplay, 500);
}

function playNextChannelUpload() {
  playVideoAtIndex(creatorCurrentIndex + 1);
}

function skipUnavailableVideo() {
  playerErrorCount += 1;
  if (playerErrorCount >= creatorVideoIds.length) {
    setupYoutubeFallback("Videos are public but YouTube is blocking embed/autoplay here. Host this website online and keep videos public/embeddable.");
    return;
  }
  playVideoAtIndex(creatorCurrentIndex + 1);
}

async function refreshCreatorVideoList() {
  try {
    const latestIds = await fetchLatestChannelVideoIds();
    creatorVideoIds = uniqueVideoIds([...latestIds, ...creatorVideoIds]);
  } catch (error) {
    console.warn("YouTube refresh skipped:", error);
  }
}

async function startCreatorYoutubePlayer() {
  const playerTarget = document.getElementById("youtubeCreatorPlayer");
  if (!playerTarget) return;

  const ids = await loadCreatorVideos();
  if (!ids.length) {
    setupYoutubeFallback("No public YouTube videos found for this channel yet.");
    return;
  }

  const playerVars = {
    autoplay: 1,
    mute: 1,
    controls: 0,
    disablekb: 1,
    fs: 0,
    playsinline: 1,
    rel: 0,
    iv_load_policy: 3,
    cc_load_policy: 0,
    loop: 1,
    enablejsapi: 1
  };

  if (window.location.protocol.startsWith("http")) {
    playerVars.origin = window.location.origin;
  }

  creatorYoutubePlayer = new YT.Player("youtubeCreatorPlayer", {
    videoId: ids[0],
    playerVars,
    events: {
      onReady: (event) => {
        event.target.mute();
        try { event.target.setVolume(0); } catch (_) {}
        event.target.playVideo();
        playerRetryTimer = setInterval(forceSilentAutoplay, 2500);
        playerRefreshTimer = setInterval(refreshCreatorVideoList, 30 * 60 * 1000);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) playNextChannelUpload();
        if (event.data === YT.PlayerState.PAUSED) forceSilentAutoplay();
      },
      onError: skipUnavailableVideo
    }
  });
}

if (document.getElementById("youtubeCreatorPlayer")) {
  const ytApi = document.createElement("script");
  ytApi.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(ytApi);

  const previousYouTubeReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (typeof previousYouTubeReady === "function") previousYouTubeReady();
    startCreatorYoutubePlayer();
  };

  window.addEventListener("beforeunload", () => {
    clearInterval(playerRetryTimer);
    clearInterval(playerRefreshTimer);
  });
}

// contect model
const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactModal = document.getElementById("contactModal");

if (openContact && closeContact && contactModal) {
  openContact.addEventListener("click", () => {
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeContact.addEventListener("click", () => {
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}
