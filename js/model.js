export const holes = [
  {
    id: 'hole1',
    par: 4,
    index: 1,
    score: '',
    fairway: '',
    gir: '',
    putts: '',
    penalties: '',
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
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
    puttLengths: ['', '', '', '', ''],
    isDirty: false,
  },
];

export let currentHole = holes[0];

export const setCurrentHole = function (holeId) {
  saveHolesToLocalStorage();
  getHolesFromLocalStorage();
  currentHole = holes[holeId];
  //set defaults, but don't change is dirty unless the user changes something
  if (!currentHole.isDirty) {
    currentHole.score = currentHole.par;
    currentHole.fairway = 'fairway hit';
    currentHole.gir = 'gir hit';
    currentHole.putts = 2;
    currentHole.penalties = 0;
  }
};

//Reset form for new round
export const resetForm = function () {
  localStorage.removeItem('golfHoles');
  holes.forEach(function (hole) {
    hole.score = '';
    hole.fairway = 'fairway hit';
    hole.gir = 'gir hit';
    hole.putts = '';
    hole.penalties = '';
    for (let i = 0; i < 5; i++) {
      hole.puttLengths[i] = '';
    }
  });
  setCurrentHole(0);
};

// Retrieve holes array from localStorage
function getHolesFromLocalStorage() {
  const stored = localStorage.getItem('golfHoles');
  if (stored) {
    const parsed = JSON.parse(stored);
    for (let i = 0; i < holes.length; i++) {
      Object.assign(holes[i], parsed[i]);
    }
  }
}

// Save holes array to localStorage
function saveHolesToLocalStorage() {
  localStorage.setItem('golfHoles', JSON.stringify(holes));
}

//   const holesFromStorage = getHolesFromLocalStorage();
//   if (holesFromStorage) {
//     for (let i = 0; i < model.holes.length; i++) {
//       Object.assign(model.holes[i], holesFromStorage[i]);
//     }
//   }

// function saveHolesToLocalStorage() {
//   //console.log(currentHole.fairway);
//   currentHole.score = scoreInput.value.replace('score', '');
//   //model.currentHole.fairway = fairwayInput.value;
//   currentHole.gir = girInput.value;
//   currentHole.putts = puttsInput.value.replace('putts', '');
//   currentHole.penalties = penaltyInput.value.replace('penalties', '');
//   currentHole.putt1len = putt1Input.value.replace('putt1len', '');
//   currentHole.putt2len = putt2Input.value.replace('putt2len', '');
//   currentHole.putt3len = putt3Input.value.replace('putt3len', '');
//   currentHole.putt4len = putt4Input.value.replace('putt4len', '');
//   currentHole.putt5len = putt5Input.value.replace('putt5len', '');
//   localStorage.setItem('golfHoles', JSON.stringify(model.holes));
// }
