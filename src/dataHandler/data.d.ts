interface IReturnedData {
  createdAt: Date,
  updatedAt: Date,
}

export interface IAsteroidClickData extends IReturnedData {
  id: number,
  spawnToClickTime: number,
  correct: boolean,
  question: string,
  sessionId: string,
}

export interface ISentenceConstructorClickDataModel extends IReturnedData {
  sessionId: string
  correct: boolean | null
  spawnToClickTime: number
  attemptedAnswer: string
  attemptedSlotNumber: number | null
}

export interface ISentenceConstructorCompletedDataModel extends IReturnedData {
  sessionId: string
  spawnToClickTime: number
  attemptedAnswerString: string
  correctPercentage: number | null,
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
  gameType: string,
}

export interface ISession extends IReturnedData {
  sessionId: string,
  lessonId: string,
  playerName: string,
  finishedAt: Date,
  asteroidClickData?: IAsteroidClickData[],
  sentenceConstructorClickData?: ISentenceConstructorClickDataModel[],
  sentenceConstructorCompletedData?: ISentenceConstructorCompletedDataModel[],
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