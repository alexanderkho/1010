const hs = "1010_high_score";

const get = (): number => {
  const savedHighScore = window.localStorage.getItem(hs);
  if (savedHighScore) {
    return parseInt(savedHighScore);
  }
  return 0;
};

const set = (newScore: number): void => {
  window.localStorage.setItem(hs, newScore.toString());
};

export { get, set };
