import { Player } from './mse.js';

const elVideo = document.getElementById('video');
const elInput = document.getElementById('input');
const buttonReset = document.getElementById('reset');
const buttonLoad = document.getElementById('load');

let player = null;
let elCodeTestSrc = document.getElementById('test-src');
let elCodeTestMse = document.getElementById('test-mse');
// Set default value for a test source file
let href = document.location.href;
let directory = href.substring(0, href.lastIndexOf('/')) + '/';
elInput.value = directory + 'testsrc.mp4';

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

elCodeTestSrc.textContent = `
${directory}testsrc.mp4
${directory}testsrc-progressive.mp4
`;

elCodeTestMse.textContent = `
${directory}testsrc-progressive-fragmented.mp4
${directory}example-mpd-playlist-based/master.mpd
${directory}example-mpd-template-based/master.mpd
http://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd
http://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8
`;
