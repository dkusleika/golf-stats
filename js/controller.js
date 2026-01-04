import * as model from './model.js';

const currentHoleLabel = document
  .querySelector('.hole-number')
  .querySelector('.hole-num');
const holeNav = document.querySelectorAll(
  '.hole-nav.next-hole, .hole-nav.prev-hole'
);
const scoreInput = document.getElementById('score');
const fairwayInput = document.querySelector('.fairway-target');
const fairwayText = document.querySelector('.fairway-text');
const girInput = document.querySelector('.gir-target');
const girText = document.querySelector('.gir-text');
const puttsInput = document.getElementById('putts');
const penaltyInput = document.getElementById('penalties');
const putt1Input = document.getElementById('putt1len');
const putt2Input = document.getElementById('putt2len');
const putt3Input = document.getElementById('putt3len');
const putt4Input = document.getElementById('putt4len');
const putt5Input = document.getElementById('putt5len');
const submitButton = document.querySelector('.submit');
const resetButton = document.querySelector('.reset');
const form = document.querySelector('.golf-score-form');

// Write to local storage, change current hole, and init form
const changeHole = function (direction) {
  //if direction is a hole number, set to that hole. otherwise prev or next
  let newIndex;
  if (Number.isInteger(direction)) {
    newIndex = +direction;
  } else if (direction === 'next-hole') {
    newIndex = model.currentHole.index + 1;
  } else if (direction === 'prev-hole') {
    newIndex = model.currentHole.index - 1;
  }

  //console.log('change before', model.holes[0]);
  model.setCurrentHole(newIndex - 1);
  //console.log('change after', model.holes[0]);
  renderHole();
};

// Only show valid nav buttons
const showHideNav = function () {
  document
    .querySelector('.prev-hole')
    .classList.toggle('hidden', +model.currentHole.index === 1);
  document
    .querySelector('.next-hole')
    .classList.toggle('hidden', +model.currentHole.index === 18);
};

//Gotta rethink this whole dirty form thing
//I want defaults, but I don't want a hole to be dirty unless the user changes something
//That means if the defualts are all good and they don't enter puts, it won't save the hole
//I think prepoulate the model with defaults, but only set the IsDirty flag if the user changes something on this or a subsequent hole
//form loads - initialize hole 1 with defaults and set to currenthold
//user changes to hole 2, initialize it but keep isDirty false
//user edits hole 2, both hole1 and hole2 are dirty even if nothing was changed on hold1

const renderHole = function () {
  currentHoleLabel.value = 'hole' + model.currentHole.index;
  scoreInput.value = `score${model.currentHole.score}`;
  renderFairway(model.currentHole.fairway, 1);
  renderGir(model.currentHole.gir, 1);
  puttsInput.value = `putts${model.currentHole.putts}`;
  penaltyInput.value = `penalties${model.currentHole.penalties}`;
  putt1Input.value = model.currentHole.puttLengths[0];
  putt2Input.value = model.currentHole.puttLengths[1];
  putt3Input.value = model.currentHole.puttLengths[2];
  putt4Input.value = model.currentHole.puttLengths[3];
  putt5Input.value = model.currentHole.puttLengths[4];

  showHideNav();
  scoreInput.focus();
};

const setFairway = function (btn) {
  // if it's a second click, add trouble
  if (btn === model.currentHole.fairway && btn !== 'fairway hit') {
    model.currentHole.fairway += ' trbl';
  } else {
    //if it's the first click, set it
    model.currentHole.fairway = btn;
    fairwayText.textContent = model.currentHole.fairway;
  }
  renderFairway();
};

const setGir = function (btn) {
  if (btn === model.currentHole.gir && btn !== 'gir hit') {
    model.currentHole.gir += 'trbl';
  } else {
    model.currentHole.gir = btn;
    girText.textContent = model.currentHole.gir;
  }
  renderGir();
};
const renderFairway = function () {
  fairwayText.textContent = model.currentHole.fairway;
  document.querySelectorAll('.target-child__fairway').forEach(function (e) {
    e.classList.remove('target-child-active');
  });
  document
    .querySelector(
      '[data-value="' + model.currentHole.fairway.replace(' trbl', '') + '"]'
    )
    .classList.add('target-child-active');
};

const renderGir = function () {
  girText.textContent = model.currentHole.gir;
  document.querySelectorAll('.target-child__gir').forEach(function (e) {
    e.classList.remove('target-child-active');
  });
  document
    .querySelector(
      '[data-value="' + model.currentHole.gir.replace(' trbl', '') + '"]'
    )
    .classList.add('target-child-active');
};

// Initialize form on page load
changeHole(1);

// Event listeners
holeNav.forEach(function (anchor) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    //console.log('nav before', model.holes[0]);
    changeHole(event.target.classList[0]);
    //console.log('nav after', model.holes[0]);
  });
});

currentHoleLabel.addEventListener('change', (e) => {
  changeHole(+e.target.value.replace('hole', ''));
});

form.addEventListener('change', function (e) {
  e.preventDefault;

  if (e.target.classList.contains('puttlen')) {
    const puttNum = e.target.id.replace('putt', '').replace('len', '');
    model.currentHole.puttLengths[puttNum - 1] = e.target.value;
  } else {
    model.currentHole[e.target.id] = e.target.value.replace(e.target.id, '');
    console.log(model.currentHole);
  }
  model.currentHole.isDirty = true;
});

fairwayInput.addEventListener('click', function (e) {
  e.preventDefault;
  model.currentHole.isDirty = true;
  setFairway(e.target.closest('.target-child').dataset.value, 0);
});

girInput.addEventListener('click', function (e) {
  e.preventDefault;
  model.currentHole.isDirty = true;
  setGir(e.target.closest('.target-child__gir').dataset.value, 0);
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
      values: model.holes.map((hole) => Object.values(hole)),
    },
  });
}

resetButton.addEventListener('click', function (event) {
  event.preventDefault();
  model.resetForm();
});

// puttsInput.addEventListener('change', function (event) {
//   showHidePutts(+event.target.value.replace('putts', ''));
// });
