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

export interface IAsteroidSessionConfig {
  sessionId: string,
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
}

export interface ISCSessionConfig {
  sessionId: string
  hintMessage?: string
  nextContentSlug?: string
}

export interface ISession extends IReturnedData {
  sessionId: string,
  lessonId: string,
  playerName: string,
  finishedAt: Date,
  asteroidClickData?: IAsteroidClickData[],
  asteroidSessionConfigs?: IAsteroidSessionConfig[],
  sentenceConstructorClickData?: ISentenceConstructorClickDataModel[],
  sentenceConstructorCompletedData?: ISentenceConstructorCompletedDataModel[],
  sentenceConstructorConfigs?: ISCSessionConfig[],
}

// interface game<T> { type: T }

// interface asteroidGame extends game<"asteroid"> {}

export interface ILesson extends IReturnedData {
  id: string,
  teacherId: string,
  gameType: string,
  sessions: ISession[]
}