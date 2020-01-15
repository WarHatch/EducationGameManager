import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameSessionData, ISessionConfig, ILesson, ISession } from "./data";

export const getSessionData = async (lessonId: string, sessionId: string): Promise<IGameSessionData> => {
  const res: AxiosResponse<IGameSessionData> = await axios.post(
    `http://localhost:8090/lesson/${lessonId}/session/data`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const getLatestSessionConfig = async (lessonId: string, sessionId: string): Promise<ISessionConfig> => {
  const res = await axios.post(
    `http://localhost:8090/lesson/${lessonId}/session/config`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const sendLatestSessionConfig = async (lessonId: string, sessionConfig: ISessionConfig): Promise<ISessionConfig> => {
  const res = await axios.post(
    `http://localhost:8090/lesson/${lessonId}/session/config/new`,
    sessionConfig,
  );
  const { data } = res;
  return data;
}

// Lesson
interface ILessonResponse {
  id: string,
  teacherId: string,
  gameTypeJSON: string,
  sessions: ISession[],
  createdAt,
  updatedAt,
}

interface ILessonCreate {
  id: string,
  teacherId: string,
  gameType: {[key: string]: any},
  sessions: ISession[],
}
export const createLesson = async (lessonData: ILessonCreate): Promise<ILesson> => {
  const res: AxiosResponse<ILessonResponse> = await axios.post(
    `http://localhost:8090/lesson/new`,
    lessonData,
  );
  const { data } = res;
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
    `http://localhost:8090/lesson/`,
    lessonData,
  );
  const { data } = res;
  // @ts-ignore
  if (data.error !== undefined) throw data;

  const gameType = JSON.parse(data.gameTypeJSON);

  const formattedData: ILesson = {
    ...data,
    gameType,
  }

  return formattedData;
}
