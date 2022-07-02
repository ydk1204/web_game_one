const SCOREPLUSE = "SCOREPLUSE";

const initialState = 0;

export const playerScore = () => ({
  type: SCOREPLUSE
});

export default function ballLocation(currentScore = initialState, action) {
  switch (action.type) {
    case SCOREPLUSE:
      return currentScore + 1;
    default:
      return currentScore;
  }
}