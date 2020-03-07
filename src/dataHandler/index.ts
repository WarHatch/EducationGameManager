import axios, { AxiosResponse } from "axios";
import config from "../config";

// AxiosResponse type which supports having error property (e.g.: response.data.error)
type ErrorableResponse<T> = AxiosResponse<T & { error?: any }>

// interfaces
import { IGameSessionData, ISessionConfig, ILesson, ISession } from "./data";

//#region Session
export const getSessionData = async (lessonId: string, sessionId: string): Promise<IGameSessionData> => {
  const res: ErrorableResponse<IGameSessionData> = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/data`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const getLatestSessionConfig = async (lessonId: string, sessionId: string): Promise<ISessionConfig> => {
  const res: ErrorableResponse<ISessionConfig> = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/config`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const sendLatestSessionConfig = async (lessonId: string, sessionConfig: ISessionConfig): Promise<ISessionConfig> => {
  const res: ErrorableResponse<ISessionConfig> = await axios.post(
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
  gameType: { [key: string]: any },
  sessions: ISession[],
}
export const createLesson = async (lessonData: ILessonCreate): Promise<ILesson> => {
  const res: ErrorableResponse<ILessonResponse> = await axios.post(
    `${config.gameElementApiURL}/lesson/new`,
    lessonData,
  );
  const { data } = res;
  if (data === null) throw new Error("createLesson responded with null payload");
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
  const res: ErrorableResponse<ILessonResponse> = await axios.post(
    `${config.gameElementApiURL}/lesson/`,
    lessonData,
  );
  const { data } = res;
  if (data === null) throw new Error("Unable to find teacher's lesson");
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
