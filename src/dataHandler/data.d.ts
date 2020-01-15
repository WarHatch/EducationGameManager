interface IReturnedData {
  createdAt: Date,
  updatedAt: Date,
}

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

export interface ISession extends IReturnedData {
  sessionId: string,
  finishedAt: Date,
  lessonId: string,
  // TODO: sessionConfigs???
}

export interface ILesson extends IReturnedData {
  id: string,
  teacherId: string,
  gameType: {
    type: "asteroid",
    // TODO: add more config
    [key: string]: any
  },
  sessions: ISession[]
}