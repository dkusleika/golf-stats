const hamburger = document.querySelector('.nav__hamburger');
const menuclose = document.querySelector('.nav__close');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-item');
const menuItemStats = document.querySelector('.menu-item-stats');
const menuItemScorecard = document.querySelector('.menu-item-scorecard');
const menuItemChangeCourse = document.querySelector('.menu-item-change-course');
const menuItemResetGame = document.querySelector('.menu-item-reset-game');
const menuItemResetHole = document.querySelector('.menu-item-reset-hole');
const menuItemHelp = document.querySelector('.menu-item-help');

const scorecard = document.querySelector('.scorecard');
const help = document.querySelector('.help');

const form = document.querySelector('.golf-score-form');
const holeNav = document.querySelectorAll(
  '.hole-nav.next-hole, .hole-nav.prev-hole',
);
const currentHoleLabel = document
  .querySelector('.hole-number')
  .querySelector('.hole-num');
const parLabelInput = document.querySelector('.parlabel');
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

const toggleMenu = function () {
  menu.classList.toggle('showmenu');
  menuclose.classList.toggle('nav__hidden');
  hamburger.classList.toggle('nav__hidden');
};

hamburger.addEventListener('click', toggleMenu);
menuclose.addEventListener('click', toggleMenu);
menuItems.forEach(function (item) {
  item.addEventListener('click', toggleMenu);
});

menuItemStats.addEventListener('click', function (e) {
  e.preventDefault();
  scorecard.classList.add('nodisplay');
  form.classList.remove('nodisplay');
  help.classList.add('nodisplay');
});

menuItemScorecard.addEventListener('click', function (e) {
  e.preventDefault();
  scorecard.classList.remove('nodisplay');
  form.classList.add('nodisplay');
  help.classList.add('nodisplay');
});

menuItemChangeCourse.addEventListener('change', function (e) {
  e.preventDefault();
  toggleMenu();
});

export const addHandlerMenutemChangeCourse = function (handler) {
  menuItemChangeCourse.addEventListener('change', handler);
};

export const addHandlerMenuItemResetGame = function (handler) {
  menuItemResetGame.addEventListener('click', handler);
};

export const addHandlerMenuItemResetHole = function (handler) {
  menuItemResetHole.addEventListener('click', handler);
};

menuItemHelp.addEventListener('click', function (e) {
  e.preventDefault();
  scorecard.classList.add('nodisplay');
  form.classList.add('nodisplay');
  help.classList.remove('nodisplay');
});

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
  menuItemResetGame.addEventListener('click', handler);
};

export const renderHole = function (
  par,
  index,
  score,
  fairway,
  gir,
  putts,
  penalties,
  puttlengths,
  sandsave,
  isdirty,
) {
  currentHoleLabel.value = `hole${index}`;
  parLabelInput.textContent = `Par: ${par}`;
  scoreInput.value = `score${score}`;
  renderFairway(fairway, par);
  renderGir(gir);
  puttsInput.value = `putts${putts}`;
  penaltyInput.value = `penalties${penalties}`;
  sandSaveInput.value = `sandsave${sandsave}`;
  for (let i = 0; i < puttlengths.length; i++) {
    puttLenInputs[i].value = puttlengths[i];
  }
  showHideNav(index);
};

export const renderFairway = function (fairway, par) {
  const fairways = document.querySelectorAll('.target-child__fairway');
  const fairwayAnchors = document.querySelectorAll('.fairway-anchor');
  if (par === 3) {
    fairwayAnchors.forEach(function (e) {
      e.classList.add('not-applicable');
    });
    fairways.forEach(function (e) {
      e.classList.add('not-applicable');
    });
  } else {
    fairwayText.textContent = fairway;
    fairwayAnchors.forEach(function (e) {
      e.classList.remove('not-applicable');
    });
    fairways.forEach(function (e) {
      e.classList.remove('not-applicable');
      e.classList.remove('target-child-active');
    });

    document
      .querySelector(`[data-value="${fairway.replace(' trbl', '')}"]`)
      .classList.add('target-child-active');
  }
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
