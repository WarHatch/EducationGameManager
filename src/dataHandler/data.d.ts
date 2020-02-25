interface IReturnedData {
  createdAt: Date,
  updatedAt: Date,
}

export interface IGameSessionData {
  fullData: ISession;
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
  playerName: string,

  sessionConfigs: ISessionConfig[],
}

interface game<T> { type: T }

interface asteroidGame extends game<"asteroid"> {}

interface assemblyGame extends game<"assembly"> {

}

export interface ILesson extends IReturnedData {
  id: string,
  teacherId: string,
  gameType: asteroidGame | assemblyGame
  sessions: ISession[]
}