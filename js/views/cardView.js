// import { currentHole } from '../model';

export const renderCard = function (currentHole, cumulativeStats) {
  document.querySelector(`.card-row-score--${currentHole.index}`).textContent =
    currentHole.score;
  document.querySelector(
    `.card-hole-stats--fairway--${currentHole.index}`,
  ).textContent = currentHole.fairway === 'fairway hit' ? '🟢' : '';
  document.querySelector(
    `.card-hole-stats--gir--${currentHole.index}`,
  ).textContent = currentHole.gir === 'gir hit' ? '✖️' : '';
  document.querySelector(
    `.card-hole-stats--sandsave--${currentHole.index}`,
  ).textContent =
    currentHole.sandsave === 'N/A'
      ? ''
      : currentHole.sandsave === 'Yes'
        ? 'S'
        : '$';

  document.querySelector(
    `.card-hole-stats--putts--${currentHole.index}`,
  ).textContent = currentHole.putts;
  document.querySelector(
    `.card-hole-stats--penalties--${currentHole.index}`,
  ).textContent = currentHole.penalties ? `${currentHole.penalties}` : '';
  updateTotals(cumulativeStats);

  currentHole.puttLengths.forEach(function (putt, i) {
    document.querySelector(
      `.card-row-putts-putt${currentHole.index}-${i + 1}`,
    ).textContent = putt ? `${putt}` : '';
  });
};

const updateTotals = function (cumulativeStats) {
  document.querySelector('.card-row-score--totalfront').textContent =
    cumulativeStats.score.front ? `${cumulativeStats.score.front}` : '';
  document.querySelector('.card-row-score--totalback').textContent =
    cumulativeStats.score.back ? `${cumulativeStats.score.back}` : '';
  document.querySelector('.card-hole-stats--fairway--totalfront').textContent =
    cumulativeStats.fairway.front ? `${cumulativeStats.fairway.front}` : '';
  document.querySelector('.card-hole-stats--gir--totalfront').textContent =
    cumulativeStats.gir.front ? `${cumulativeStats.gir.front}` : '';
  document.querySelector('.card-hole-stats--sandsave--totalfront').textContent =
    cumulativeStats.sandsave.front ? `${cumulativeStats.sandsave.front}` : '';
  document.querySelector('.card-hole-stats--putts--totalfront').textContent =
    cumulativeStats.putts.front ? `${cumulativeStats.putts.front}` : '';
  document.querySelector(
    '.card-hole-stats--penalties--totalfront',
  ).textContent = cumulativeStats.penalties.front
    ? `${cumulativeStats.penalties.front}`
    : '';

  document.querySelector('.summary-value--score').textContent =
    cumulativeStats.score.front + cumulativeStats.score.back;
  document.querySelector('.summary-pct--score').textContent =
    cumulativeStats.score.pct;
  document.querySelector('.summary-value--fairways').textContent =
    cumulativeStats.fairway.front + cumulativeStats.fairway.back;
  document.querySelector('.summary-pct--fairways').textContent =
    cumulativeStats.fairway.pct === 0
      ? '0%'
      : `${Math.round(((cumulativeStats.fairway.front + cumulativeStats.fairway.back) / cumulativeStats.fairway.pct) * 100)}%`;
  document.querySelector('.summary-value--GIRs').textContent =
    cumulativeStats.gir.front + cumulativeStats.gir.back;

  document.querySelector('.summary-pct--GIRs').textContent =
    cumulativeStats.gir.pct === 0
      ? '0%'
      : `${Math.round(((cumulativeStats.gir.front + cumulativeStats.gir.back) / cumulativeStats.gir.pct) * 100)}%`;
  document.querySelector('.summary-value--sandsaves').textContent =
    cumulativeStats.sandsave.front + cumulativeStats.sandsave.back;
  document.querySelector('.summary-pct--sandsaves').textContent =
    cumulativeStats.sandsave.pct === 0
      ? '0%'
      : `${Math.round(((cumulativeStats.sandsave.front + cumulativeStats.sandsave.back) / cumulativeStats.sandsave.pct) * 100)}%`;

  document.querySelector('.summary-value--putts').textContent =
    cumulativeStats.putts.front + cumulativeStats.putts.back;

  document.querySelector('.summary-value--penalties').textContent =
    cumulativeStats.penalties.front + cumulativeStats.penalties.back;

  document.querySelector('.summary-value--puttsmade').textContent =
    cumulativeStats.puttsmade.total ? `${cumulativeStats.puttsmade.total}` : '';
};
