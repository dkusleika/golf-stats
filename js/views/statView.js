const form = document.querySelector('.golf-score-form');
const holeNav = document.querySelectorAll(
  '.hole-nav.next-hole, .hole-nav.prev-hole'
);
const currentHoleLabel = document
  .querySelector('.hole-number')
  .querySelector('.hole-num');
const scoreInput = document.getElementById('score');
const fairwayText = document.querySelector('.fairway-text');
const fairwayInput = document.querySelector('.fairway-target');
const girText = document.querySelector('.gir-text');
const girInput = document.querySelector('.gir-target');
const puttsInput = document.getElementById('putts');
const penaltyInput = document.getElementById('penalties');
const sandSaveInput = document.getElementById('sandsave');
const puttLenInputs = [];
for (let i = 0; i < 6; i++) {
  puttLenInputs[i] = document.getElementById(`putt${i + 1}len`);
}

const resetButton = document.querySelector('.reset');

export const addHandlerFormChange = function (handler) {
  form.addEventListener('change', handler);
};

export const addHandlerFormTouchStart = function (handler) {
  form.addEventListener('touchstart', handler);
};

export const addHandlerFormTouchEnd = function (hanlder) {
  form.addEventListener('touchend', hanlder);
};

export const addHandlerNav = function (handler) {
  holeNav.forEach(function (anchor) {
    anchor.addEventListener('click', handler);
  });
};

export const addHandlerCurrentHole = function (handler) {
  currentHoleLabel.addEventListener('change', handler);
};
export const addHandlerFairway = function (handler) {
  fairwayInput.addEventListener('click', handler);
};

export const addHandlerGir = function (handler) {
  girInput.addEventListener('click', handler);
};

export const addHandlerReset = function (handler) {
  resetButton.addEventListener('click', handler);
};

export const renderHole = function (
  index,
  score,
  fairway,
  gir,
  putts,
  penalties,
  puttlengths,
  sandsave
) {
  currentHoleLabel.value = `hole${index}`;
  scoreInput.value = `score${score}`;
  renderFairway(fairway, 1);
  renderGir(gir, 1);
  puttsInput.value = `putts${putts}`;
  penaltyInput.value = `penalties${penalties}`;
  sandSaveInput.value = `sandsave${sandsave}`;
  for (let i = 0; i < puttlengths.length; i++) {
    puttLenInputs[i].value = puttlengths[i];
  }

  showHideNav(index);
  scoreInput.focus();
};

export const renderFairway = function (fairway) {
  fairwayText.textContent = fairway;
  document.querySelectorAll('.target-child__fairway').forEach(function (e) {
    e.classList.remove('target-child-active');
  });

  document
    .querySelector(`[data-value="${fairway.replace(' trbl', '')}"]`)
    .classList.add('target-child-active');
};

export const renderGir = function (gir) {
  girText.textContent = gir;
  document.querySelectorAll('.target-child__gir').forEach(function (e) {
    e.classList.remove('target-child-active');
  });
  document
    .querySelector(`[data-value="${gir.replace(' trbl', '')}"]`)
    .classList.add('target-child-active');
};

// Only show valid nav buttons
const showHideNav = function (index) {
  document.querySelector('.prev-hole').classList.toggle('hidden', index === 1);
  document.querySelector('.next-hole').classList.toggle('hidden', index === 18);
};
