interface IReturnedData {
  createdAt: Date,
  updatedAt: Date,
}

export interface IClickData extends IReturnedData {
  id: number,
  reactionTime: number,
  correct: boolean,
  question: string,
  sessionId: string,
} 

export interface IGameSessionData extends IReturnedData {
  fullData: ISession;
  averageReactionTime: number | null,
  correctPercentage: number | null,
  incorrectPercentage: number | null,
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
  playerName: string,
  clickData: IClickData[],
  // sessionConfigs: ISessionConfig[],
}

// interface game<T> { type: T }

// interface asteroidGame extends game<"asteroid"> {}

export interface ILesson extends IReturnedData {
  id: string,
  teacherId: string,
  gameType: string,
  sessions: ISession[]
}