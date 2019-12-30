export interface IGameSessionData {
  fullData: {
    id: number,
    sessionId: string,
    reactionTime: number,
    correct: boolean,
    question: string,
    [key: string]: any
  };
  averageReactionTime: number,
  correctPercentage: number,
  incorrectPercentage: number,
}

export interface ISessionConfig {
  sessionId: string,
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
}