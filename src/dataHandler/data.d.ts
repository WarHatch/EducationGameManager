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

export interface ILessonCreateData {
  id: string,
  teacherId: string,
  gameType: {
    type: "asteroid",
    // TODO: add more config
    [key: string]: any
  },
}

export interface ILesson extends ILessonCreateData {
  gameTypeJSON: string;
}