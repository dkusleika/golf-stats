export const renderCard = function (par, hole, score) {
  document.querySelector(`.card-row-score--${hole}`).textContent = score;
  updateTotals(par);
};

const updateTotals = function (par) {
  let frontScore = 0;
  let backScore = 0;
  for (let i = 1; i <= 18; i++) {
    const score = parseInt(
      document.querySelector(`.card-row-score--${i}`).textContent,
    );
    if (!isNaN(score)) {
      frontScore += i <= 9 ? score : 0;
      backScore += i > 9 ? score : 0;
    }
  }
  document.querySelector('.card-row-score--totalfront').textContent =
    frontScore;
  document.querySelector('.card-row-score--totalback').textContent = backScore;

  document.querySelector('.summary-value--score').textContent =
    frontScore + backScore;
  document.querySelector('.summary-pct--score').textContent = par;
};
