const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const speedSlider = document.getElementById('speedSlider');
const originalSpeed = 1; // Define the original playback speed

// Set the initial playback speed when the page loads
audioPlayer.playbackRate = originalSpeed;
speedSlider.value = originalSpeed;

playPauseBtn.addEventListener('click', togglePlayPause);
speedSlider.addEventListener('input', changeSpeed);

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
  }
}

function changeSpeed() {
  audioPlayer.playbackRate = speedSlider.value;
}
