const songs = [
  { title: "Morning Light", artist: "Demo Track", src: "songs/morning-light.wav", color: "#5b4bd5" },
  { title: "Night Drive", artist: "Demo Track", src: "songs/night-drive.wav", color: "#c2410c" },
  { title: "Calm Waves", artist: "Demo Track", src: "songs/calm-waves.wav", color: "#0f766e" }
];

const audio = document.getElementById("audio");
const record = document.getElementById("record");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let index = 0;
let isPlaying = false;

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return m + ":" + s;
}

function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.tabIndex = 0;
    li.className = i === index ? "active" : "";
    li.innerHTML = "<strong>" + song.title + "</strong><span>" + song.artist + "</span>";
    li.addEventListener("click", () => choose(i));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter") choose(i);
    });
    playlist.appendChild(li);
  });
}

function loadSong(i) {
  index = i;
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  document.documentElement.style.setProperty("--accent", song.color);
  progress.value = 0;
  currentEl.textContent = "0:00";
  durationEl.textContent = "0:00";
  renderPlaylist();
}

function setPlaying(state) {
  isPlaying = state;
  playBtn.innerHTML = state ? "&#9208;" : "&#9654;";
  playBtn.setAttribute("aria-label", state ? "Pause" : "Play");
  record.classList.toggle("spin", state);
}

function play() {
  audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
}

function pause() {
  audio.pause();
  setPlaying(false);
}

function choose(i) {
  loadSong(i);
  play();
}

function next() {
  loadSong((index + 1) % songs.length);
  if (isPlaying) play();
}

function prev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  loadSong((index - 1 + songs.length) % songs.length);
  if (isPlaying) play();
}

playBtn.addEventListener("click", () => (isPlaying ? pause() : play()));
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
  loadSong((index + 1) % songs.length);
  play();
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.volume = volume.value;
loadSong(0);
