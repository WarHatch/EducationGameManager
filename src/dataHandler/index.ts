import axios, { AxiosResponse } from "axios";
import config from "../config";

// TODO: create an AxiosResponse<> interface which supports having error property (res.data.error)

// interfaces
import { IGameSessionData, ISessionConfig, ILesson, ISession } from "./data";

//#region Session
export const getSessionData = async (lessonId: string, sessionId: string): Promise<IGameSessionData> => {
  const res: AxiosResponse<IGameSessionData> = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/data`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const getLatestSessionConfig = async (lessonId: string, sessionId: string): Promise<ISessionConfig> => {
  const res = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/config`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const sendLatestSessionConfig = async (lessonId: string, sessionConfig: ISessionConfig): Promise<ISessionConfig> => {
  const res = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/config/new`,
    sessionConfig,
  );
  const { data } = res;
  return data;
}
//#endregion

//#region Lesson
type ILessonResponse = null | {
  id: string,
  teacherId: string,
  contentSlug: string,
  gameTypeJSON: string,
  sessions: ISession[],
  createdAt,
  updatedAt,
}

interface ILessonCreate {
  id: string,
  teacherId: string,
  contentSlug: string,
  gameType: {[key: string]: any},
  sessions: ISession[],
}
export const createLesson = async (lessonData: ILessonCreate): Promise<ILesson> => {
  const res: AxiosResponse<ILessonResponse> = await axios.post(
    `${config.gameElementApiURL}/lesson/new`,
    lessonData,
  );
  const { data } = res;
  if (data === null) throw new Error("createLesson responded with null payload");
  // @ts-ignore
  if (data.error !== undefined) throw data;

  const gameType = JSON.parse(data.gameTypeJSON);

  const formattedData: ILesson = {
    ...data,
    gameType,
  }

  return formattedData;
}


interface ILessonQuery {
  id?: string,
  teacherId?: string,
}
export const getLesson = async (lessonData: ILessonQuery): Promise<ILesson> => {
  const res: AxiosResponse<ILessonResponse> = await axios.post(
    `${config.gameElementApiURL}/lesson/`,
    lessonData,
  );
  const { data } = res;
  if (data === null) throw new Error("Unable to get lesson");
  // @ts-ignore
  if (data.error !== undefined) throw data;

  const gameType = JSON.parse(data.gameTypeJSON);

  const formattedData: ILesson = {
    ...data,
    gameType,
  }

  return formattedData;
}
//#endregion

export { getGameType } from "./cms";
