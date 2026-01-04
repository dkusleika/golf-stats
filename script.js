const apiKey = 'AIzaSyDa9faejoXq72kPsdRZHAyBgDwdDXjtbUg';
const client_id =
  '414842801584-hklgogkkrdrmgeibae0bid0b5qvrekud.apps.googleusercontent.com';
const ss_id = '1kWHVRFINejCM7eN2D1q93wgBzJzODf-uYKxmNoqsiv0';

const currentHoleLabel = document
  .querySelector('.hole-number')
  .querySelector('.hole-num');
const holeNav = document.querySelectorAll(
  '.hole-nav.next-hole, .hole-nav.prev-hole'
);
const scoreInput = document.getElementById('score');
const fairwayInput = document.querySelector('.fairway-target');
const fairwayText = document.querySelector('.fairway-text');
const girInput = document.getElementById('gir');
const puttsInput = document.getElementById('putts');
const penaltyInput = document.getElementById('penalties');
const putt1Input = document.getElementById('putt1len');
const putt2Input = document.getElementById('putt2len');
const putt3Input = document.getElementById('putt3len');
const putt4Input = document.getElementById('putt4len');
const putt5Input = document.getElementById('putt5len');
const submitButton = document.querySelector('.submit');
const resetButton = document.querySelector('.reset');

const holes = [
  {
    id: 'hole1',
    par: 4,
    index: 1,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole2',
    par: 3,
    index: 2,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole3',
    par: 4,
    index: 3,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole4',
    par: 4,
    index: 4,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole5',
    par: 3,
    index: 5,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole6',
    par: 4,
    index: 6,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole7',
    par: 4,
    index: 7,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole8',
    par: 5,
    index: 8,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole9',
    par: 4,
    index: 9,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole10',
    par: 5,
    index: 10,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole11',
    par: 3,
    index: 11,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole12',
    par: 5,
    index: 12,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole13',
    par: 4,
    index: 13,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole14',
    par: 4,
    index: 14,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole15',
    par: 3,
    index: 15,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole16',
    par: 4,
    index: 16,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole17',
    par: 4,
    index: 17,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
  {
    id: 'hole18',
    par: 4,
    index: 18,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
  },
];

let currentHole = holes[0];
let tokenClient;

// // Show as many inputs as needed for putts
// const showHidePutts = function (putts) {
//   document.querySelectorAll('.puttlen').forEach(function (putt) {
//     putt.classList.add('hidden');
//     putt.labels[0].classList.add('hidden');
//     if (putt.id <= 'putt' + putts + 'len') {
//       putt.classList.remove('hidden');
//       putt.labels[0].classList.remove('hidden');
//     }
//   });
// };

// Write to local storage, change current hole, and init form
const changeHole = function (direction) {
  saveHolesToLocalStorage();

  //if direction is a hole number, set to that hole. otherwise prev or next
  let newIndex;
  if (Number.isInteger(direction)) {
    newIndex = +direction;
  } else if (direction === 'next-hole') {
    newIndex = currentHole.index + 1;
  } else if (direction === 'prev-hole') {
    newIndex = currentHole.index - 1;
  }
  currentHole = holes.find((hole) => hole.index === newIndex);
  currentHoleLabel.value = 'hole' + currentHole.index;

  initForm(); // Reset form for new hole
};

// Only show valid nav buttons
const showHideNav = function () {
  document
    .querySelector('.prev-hole')
    .classList.toggle('hidden', +currentHole.index === 1);
  document
    .querySelector('.next-hole')
    .classList.toggle('hidden', +currentHole.index === 18);
};

// Initialize form with current hole data
const initForm = function () {
  const holesFromStorage = getHolesFromLocalStorage();
  if (holesFromStorage) {
    for (let i = 0; i < holes.length; i++) {
      Object.assign(holes[i], holesFromStorage[i]);
    }
  }

  currentHoleLabel.value = 'hole' + currentHole.index;

  // If score doesn't exist, set defaults
  if (currentHole.score.length > 0) {
    scoreInput.value = `score${currentHole.score}`;
    setFairway(currentHole.fairway, 1);
    girInput.value = currentHole.gir;
    puttsInput.value = `putts${currentHole.putts}`;
    penaltyInput.value = `penalties${currentHole.penalties}`;
    putt1Input.value = currentHole.putt1len;
    putt2Input.value = currentHole.putt2len;
    putt3Input.value = currentHole.putt3len;
    putt4Input.value = currentHole.putt4len;
    putt5Input.value = currentHole.putt5len;
  } else {
    scoreInput.value = `score${currentHole.par}`;
    setFairway('fairway hit', 1);
    girInput.value = 'hit';
    puttsInput.value = 'putts2';
    penaltyInput.value = 'penalties0';
    putt1Input.value = '';
    putt2Input.value = '';
    putt3Input.value = '';
    putt4Input.value = '';
    putt5Input.value = '';
  }

  // showHidePutts(2);
  showHideNav();
  scoreInput.focus();
};

const setFairway = function (btn, init) {
  // if it's a second click, add pk

  if (btn === currentHole.fairway && btn !== 'fairway hit' && !init) {
    currentHole.fairway += ' trbl';
    fairwayText.textContent = currentHole.fairway;
  } else {
    currentHole.fairway = btn;
    fairwayText.textContent = currentHole.fairway;
    document.querySelectorAll('.target-child').forEach(function (e) {
      e.classList.remove('target-child-active');
    });
    document
      .querySelector('[data-value="' + btn.replace(' trbl', '') + '"]')
      .classList.add('target-child-active');
  }

  // document.getElementById('Layer_1').viewBox =
  //   document.getElementById('Layer_1').viewBox;
};
//Reset form for new round
const resetForm = function () {
  localStorage.removeItem('golfHoles');
  holes.forEach(function (hole) {
    hole.score = '';
    hole.fairway = 'fairway hit';
    hole.gir = '';
    hole.putts = '';
    hole.penalties = '';
    hole.putt1len = '';
    hole.putt2len = '';
    hole.putt3len = '';
    hole.putt4len = '';
    hole.putt5len = '';
  });
  currentHole = holes[0];
  initForm();
};

// Save holes array to localStorage
function saveHolesToLocalStorage() {
  console.log(currentHole.fairway);
  currentHole.score = scoreInput.value.replace('score', '');
  //currentHole.fairway = fairwayInput.value;
  currentHole.gir = girInput.value;
  currentHole.putts = puttsInput.value.replace('putts', '');
  currentHole.penalties = penaltyInput.value.replace('penalties', '');
  currentHole.putt1len = putt1Input.value.replace('putt1len', '');
  currentHole.putt2len = putt2Input.value.replace('putt2len', '');
  currentHole.putt3len = putt3Input.value.replace('putt3len', '');
  currentHole.putt4len = putt4Input.value.replace('putt4len', '');
  currentHole.putt5len = putt5Input.value.replace('putt5len', '');
  localStorage.setItem('golfHoles', JSON.stringify(holes));
}

// Retrieve holes array from localStorage
function getHolesFromLocalStorage() {
  const stored = localStorage.getItem('golfHoles');
  return stored ? JSON.parse(stored) : null;
}

// Google Sheets API
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: client_id,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    callback: '', // defined later
  });
}

// Initialize form on page load
initForm();

// Event listeners
puttsInput.addEventListener('change', function (event) {
  showHidePutts(+event.target.value.replace('putts', ''));
});

holeNav.forEach(function (anchor) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    changeHole(event.target.classList[0]);
  });
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    // Call the Sheets API
    // await submitScores();
    await submitScores();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
});

async function submitScores() {
  saveHolesToLocalStorage();
  const dt = Intl.DateTimeFormat('en-us').format(new Date());
  // console.log(holes.map(hole => Object.values(hole)));
  let response;
  response = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: ss_id,
    range: 'Sheet1!A1:M1',
    valueInputOption: 'RAW',
    resource: {
      values: holes.map((hole) => Object.values(hole)),
    },
  });
}

resetButton.addEventListener('click', function (event) {
  event.preventDefault();
  resetForm();
});

currentHoleLabel.addEventListener('change', (e) => {
  changeHole(+e.target.value.replace('hole', ''));
});

fairwayInput.addEventListener('click', function (e) {
  e.preventDefault;
  setFairway(e.target.closest('.target-child').dataset.value, 0);
});
