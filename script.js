const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const snap = document.getElementById('snap');
const start = document.getElementById('start');
const download = document.getElementById('download');
const countdownSound = document.getElementById('countdown-sound');
const countdownText = document.getElementById('countdown');

start.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
};

snap.onclick = () => {
  let count = 3;
  countdownText.style.display = 'block';
  countdownText.textContent = count;  
  countdownSound.play(); // play countdown song
  
  const countdownInterval = setInterval(() => {
    count--;
    if(count > 0) {
      countdownText.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownText.textContent = 'SNAP !';
      setTimeout(() => {
        countdownText.style.display = 'none';
        
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const data = canvas.toDataURL('image/png');
        photo.src = data;
        photo.style.display = 'block';
     }, 500); // 3 seconds countdown
   }
  }, 1000);
};

download.onclick = () => {
  const link = document.createElement('a');
  link.download = 'photo.png';
  link.href = photo.src;
  link.click();
};
