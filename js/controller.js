import * as model from './model.js';
import * as statView from './views/statView.js';

// const submitButton = document.querySelector('.submit');

let touchStartX = 0;
let touchStartY = 0;

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

  model.setCurrentHole(newIndex - 1);

  statView.renderHole(
    model.currentHole.par,
    model.currentHole.index,
    model.currentHole.score,
    model.currentHole.fairway,
    model.currentHole.gir,
    model.currentHole.putts,
    model.currentHole.penalties,
    model.currentHole.puttLengths,
    model.currentHole.sandsave
  );
};

const setFairway = function (btn) {
  // if it's a second click, add trouble
  if (btn === model.currentHole.fairway && btn !== 'fairway hit') {
    model.currentHole.fairway += ' trbl';
  } else {
    //if it's the first click, set it
    model.currentHole.fairway = btn;
  }
  statView.renderFairway(model.currentHole.fairway);
};

const setGir = function (btn) {
  if (btn === model.currentHole.gir && btn !== 'gir hit') {
    model.currentHole.gir += ' trbl';
  } else {
    model.currentHole.gir = btn;
  }
  statView.renderGir(model.currentHole.gir);
};

const controlFormChange = function (e) {
  e.preventDefault;

  if (e.target.classList.contains('puttlen')) {
    const puttNum = e.target.id.replace('putt', '').replace('len', '');
    model.currentHole.puttLengths[puttNum - 1] = e.target.value;
  } else {
    model.currentHole[e.target.id] = e.target.value.replace(e.target.id, '');
  }

  model.currentHole.isDirty = true;
};

const controlFormTouchStart = function (event) {
  event.preventDefault;
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

const controlFormTouchEnd = function (event) {
  event.preventDefault;
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) - Math.abs(diffY) > window.innerWidth * 0.3) {
    // it's a horizontal swipe
    if (touchStartX - touchEndX > 0) {
      if (model.currentHole.index < 18) {
        changeHole('next-hole');
      }
    } else {
      if (model.currentHole.index > 1) {
        changeHole('prev-hole');
      }
    }
  }
};

const controlNav = function (event) {
  event.preventDefault();
  //console.log('nav before', model.holes[0]);
  changeHole(event.currentTarget.classList[0]);
  //console.log('nav after', model.holes[0]);
};

const controlCurrentHole = function (e) {
  changeHole(+e.target.value.replace('hole', ''));
};

const controlFairway = function (e) {
  e.preventDefault;
  model.currentHole.isDirty = true;
  setFairway(e.target.closest('.target-child').dataset.value, 0);
};

const controlGir = function (e) {
  e.preventDefault;
  model.currentHole.isDirty = true;
  setGir(e.target.closest('.target-child__gir').dataset.value, 0);
};

const controlReset = function (event) {
  event.preventDefault();
  model.resetForm();
  console.log(model.currentHole);
  changeHole(1);
};

const init = function () {
  statView.addHandlerFormChange(controlFormChange);
  statView.addHandlerFormTouchStart(controlFormTouchStart);
  statView.addHandlerFormTouchEnd(controlFormTouchEnd);
  statView.addHandlerNav(controlNav);
  statView.addHandlerCurrentHole(controlCurrentHole);
  statView.addHandlerFairway(controlFairway);
  statView.addHandlerGir(controlGir);
  statView.addHandlerReset(controlReset);

  changeHole(1);
};
init();

// submitButton.addEventListener('click', function (event) {
//   event.preventDefault();
//   tokenClient.callback = async (resp) => {
//     if (resp.error !== undefined) {
//       throw resp;
//     }
//     // Call the Sheets API
//     // await submitScores();
//     await submitScores();
//   };

//   if (gapi.client.getToken() === null) {
//     // Prompt the user to select a Google Account and ask for consent to share their data
//     // when establishing a new session.
//     tokenClient.requestAccessToken({ prompt: 'consent' });
//   } else {
//     // Skip display of account chooser and consent dialog for an existing session.
//     tokenClient.requestAccessToken({ prompt: '' });
//   }
// });

// async function submitScores() {
//   saveHolesToLocalStorage();
//   const dt = Intl.DateTimeFormat('en-us').format(new Date());
//   // console.log(holes.map(hole => Object.values(hole)));
//   let response;
//   response = await gapi.client.sheets.spreadsheets.values.append({
//     spreadsheetId: ss_id,
//     range: 'Sheet1!A1:M1',
//     valueInputOption: 'RAW',
//     resource: {
//       values: model.holes.map((hole) => Object.values(hole)),
//     },
//   });
// }

// puttsInput.addEventListener('change', function (event) {
//   showHidePutts(+event.target.value.replace('putts', ''));
// });
