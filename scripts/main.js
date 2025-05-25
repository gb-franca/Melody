// Histórico
// Histórico
fetch('https://itunes.apple.com/search?term=pop&entity=song&limit=5')
  .then(response => response.json())
  .then(data => {
    const historyList = document.getElementById('history-list');
    if (historyList) {
      historyList.innerHTML = data.results.map((song, idx) => `
        <li class="history-card" data-idx="${idx}">
          <img src="${song.artworkUrl100}" alt="${song.trackName}" class="history-img">
          <div class="history-info">
            <span class="history-title">${song.trackName}</span>
            <span class="history-artist">${song.artistName}</span>
          </div>
        </li>
      `).join('');
      // Adiciona evento de clique para tocar música do histórico
      const playerImg = document.getElementById('player-img');
      const playerTitle = document.getElementById('player-title');
      const playerArtist = document.getElementById('player-artist');
      const audioPlayer = document.getElementById('audio-player');
      document.querySelectorAll('.history-card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = card.getAttribute('data-idx');
          const song = data.results[idx];
          playerImg.src = song.artworkUrl100;
          playerImg.style.display = "block";
          playerTitle.textContent = song.trackName;
          playerArtist.textContent = song.artistName;
          audioPlayer.src = song.previewUrl;
          audioPlayer.play();
        });
      });
    }
  });

// Popular Songs + Player
fetch('https://itunes.apple.com/search?term=pop&entity=song&limit=7')
  .then(response => response.json())
  .then(data => {
    const songsList = document.getElementById('songs-list');
    if (songsList) {
      songsList.innerHTML = data.results.map((song, idx) => `
        <div class="song-card" data-idx="${idx}">
          <img src="${song.artworkUrl100}" alt="${song.trackName}">
          <div class="song-info">
            <span class="song-title">${song.trackName}</span>
            <span class="song-artist">${song.artistName}</span>
          </div>
        </div>
      `).join('');
    }

    // Player logic
    const playerImg = document.getElementById('player-img');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const audioPlayer = document.getElementById('audio-player');

    document.querySelectorAll('.song-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = card.getAttribute('data-idx');
        const song = data.results[idx];
        playerImg.src = song.artworkUrl100;
        playerImg.style.display = "block"; // Mostra a imagem ao selecionar
        playerTitle.textContent = song.trackName;
        playerArtist.textContent = song.artistName;
        audioPlayer.src = song.previewUrl;
        audioPlayer.play();
      });
    });
  });

// Perfil do usuário
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => {
    const user = data.results[0];
    document.getElementById('profile-img').src = user.picture.medium;
    document.getElementById('profile-name').textContent = user.name.first;
  });

// Player progress & volume
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');

// Atualiza barra e tempo
audioPlayer.addEventListener('timeupdate', () => {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
  progressBar.value = percent;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  durationEl.textContent = formatTime(audioPlayer.duration);
});

// Permite arrastar a barra
progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Volume
if (volumeBar) {
  volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value;
  });
}

// Função para formatar tempo
function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}