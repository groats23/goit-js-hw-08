import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(currentTimeSaveHandler, 1000));

function currentTimeSaveHandler({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

const currentTimeInSeconds = localStorage.getItem(STORAGE_KEY) || 0;

player.setCurrentTime(currentTimeInSeconds);
