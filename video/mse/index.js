import { Player } from './mse.js';

const elVideo = document.getElementById('video');
const elInput = document.getElementById('input');
const buttonReset = document.getElementById('reset');
const buttonLoad = document.getElementById('load');

let player = null;

// Set default value for a test source file
let href = document.location.href;
let directory = href.substring(0, href.lastIndexOf('/')) + '/';
elInput.value = directory + 'example-mpd-playlist-based/master.mpd';

buttonLoad.addEventListener('click', () => {
  console.log('Manifest URL', elInput.value);

  player = new Player(elVideo);
  player.load(elInput.value).then(() => {
    console.log('Player load end');
  });
});

buttonReset.addEventListener('click', () => {
  elInput.value = '';
  console.log('Manifest URL did reset');

  player.destroy();
  player = null;
});
