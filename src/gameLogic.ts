export const POSITIONS = [
  { level: 0, name: '平社員', baseSalary: 200000, nextPromo: 2 },
  { level: 1, name: '主任', baseSalary: 300000, nextPromo: 4 },
  { level: 2, name: '課長', baseSalary: 500000, nextPromo: 7 },
  { level: 3, name: '部長', baseSalary: 800000, nextPromo: 10 },
  { level: 4, name: '社長', baseSalary: 2000000, nextPromo: 999 },
];

export interface GameState {
  positionLevel: number;
  salary: number;
  stamina: number;
  lastPlayedTime: number;
  correctAnswers: number;
  isGameOver: boolean;
  gameOverReason: string;
  currentSceneId: string;
}

export const INITIAL_STATE: GameState = {
  positionLevel: 0,
  salary: 200000,
  stamina: 100,
  lastPlayedTime: Date.now(),
  correctAnswers: 0,
  isGameOver: false,
  gameOverReason: '',
  currentSceneId: 'start',
};

export const checkTimePenalty = (state: GameState): GameState => {
  if (state.isGameOver) return state;

  const now = Date.now();
  const timeDiff = now - state.lastPlayedTime;
  const hoursPassed = timeDiff / (1000 * 60 * 60);

  let newState = { ...state, lastPlayedTime: now }; // Update time to now after checking

  if (hoursPassed >= 72) {
    // 3 days without playing -> Fired!
    newState.isGameOver = true;
    newState.gameOverReason = '無断欠勤が続いたため、クビになりました...';
    return newState;
  } else if (hoursPassed >= 24) {
    // 1-2 days without playing -> Demotion
    const penaltyDays = Math.floor(hoursPassed / 24);
    for (let i = 0; i < penaltyDays; i++) {
      if (newState.positionLevel > 0) {
        newState.positionLevel -= 1;
        newState.salary = POSITIONS[newState.positionLevel].baseSalary;
        newState.correctAnswers = 0; // Reset progress to next promo
      } else {
        newState.salary = Math.max(100000, newState.salary - 50000); // Minimum salary 100k
      }
    }
  }

  return newState;
};
