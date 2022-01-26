// const log = (something) => console.log(something);

// ## Elements

const tabStoryline = document.getElementById('tabStoryline');
const tabSeasons = document.getElementById('tabSeasons');
const storyline = document.querySelector('.storyline');
const seasons = document.querySelector('.seasons');
const videos = document.querySelectorAll('.seasons__poster');
const playBtns = document.querySelectorAll('.seasons__play-btn');
const pauseBtns = document.querySelectorAll('.seasons__pause-btn');

// ## Functions

const hide = (el) => el.setAttribute('hidden', '');
const show = (el) => el.removeAttribute('hidden');
const changeTab = (activeTab, inactiveTab) => {
  activeTab.classList.add('tab--active');
  inactiveTab.classList.remove('tab--active');
};

// Play full screen trailer when user click on play button
const play = () => {
  for (const playBtn of playBtns) {
    playBtn.addEventListener('click', () => {
      const video = playBtn.previousElementSibling;
      const pauseBtn = playBtn.nextElementSibling;

      hide(playBtn);
      show(pauseBtn);

      video.setAttribute('style', 'display: block;');
      if (video.requestFullscreen) {
        video.requestFullscreen();
        video.play();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
        video.play();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
        video.play();
      }
    });
  }
};

// Stop trailer when user click on stop button
const stop = () => {
  for (const pauseBtn of pauseBtns) {
    pauseBtn.addEventListener('click', () => {
      const playBtn = pauseBtn.previousElementSibling;
      const video = playBtn.previousElementSibling;

      hide(pauseBtn);
      show(playBtn);
      video.pause();
      video.currentTime = 0;
    });
  }
};

// ## Event listeners

// Show storyline & hide seasons
tabStoryline.addEventListener('click', () => {
  changeTab(tabStoryline, tabSeasons);
  hide(seasons);
  show(storyline);
  seasons.classList.remove('seasons--show');
});

// Show seasons & hide storyline & pause all trailer
tabSeasons.addEventListener('click', () => {
  changeTab(tabSeasons, tabStoryline);
  hide(storyline);
  show(seasons);
  seasons.classList.add('seasons--show');
  for (const video of videos) video.pause();
  for (const playBtn of playBtns) show(playBtn);
  for (const pauseBtn of pauseBtns) hide(pauseBtn);
});

play();
stop();
