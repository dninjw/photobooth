const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const snap = document.getElementById('snap');
const start = document.getElementById('start');
const download = document.getElementById('download');
const countdownSound = document.getElementById('countdown-sound');

start.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
};

snap.onclick = () => {
  countdownSound.play(); // play countdown sound
  setTimeout(() => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/png');
    photo.src = data;
    photo.style.display = 'block';
  }, 3000); // 3 seconds countdown
};

download.onclick = () => {
  const link = document.createElement('a');
  link.download = 'photo.png';
  link.href = photo.src;
  link.click();
};
