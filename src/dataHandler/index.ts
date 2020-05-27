import axios, { AxiosResponse } from "axios";
import config from "../config";

// AxiosResponse type which supports having error property (e.g.: response.data.error)
type ErrorableResponse<T> = AxiosResponse<T & { error?: any }>

// interfaces
import { IGameSessionData, IAsteroidSessionConfig, ILesson, ISession, ISCSessionConfig } from "./data";

// export const getSessionData = async (lessonId: string, sessionId: string): Promise<IGameSessionData> => {
//   console.warn("getSessionData is deprecated");
//   const res: ErrorableResponse<IGameSessionData> = await axios.post(
//     `${config.gameElementApiURL}/lesson/${lessonId}/session/data`,
//     {
//       sessionId
//     }
//   );
//   const { data } = res;
//   return data;
// }

//#region Config
export const getLatestSessionConfig = async (lessonId: string, sessionId: string): Promise<IAsteroidSessionConfig> => {
  const res: ErrorableResponse<IAsteroidSessionConfig> = await axios.post(
    `${config.gameElementApiURL}/lesson/${lessonId}/session/config`,
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const sendLatestAsteroidSessionConfig =
  async (lessonId: string, sessionConfig: IAsteroidSessionConfig): Promise<IAsteroidSessionConfig> => {
    const res: ErrorableResponse<IAsteroidSessionConfig> = await axios.post(
      `${config.gameElementApiURL}/lesson/${lessonId}/session/config/new`,
      sessionConfig,
    );
    const { data } = res;
    return data;
  }

interface ISCSessionConfigPayload {
  sessionId: string
  hintMessage: string | null
  nextContentSlug: string | null
}

export const sendLatestSCSessionConfig =
  async (lessonId: string, sessionConfig: ISCSessionConfigPayload): Promise<ISCSessionConfig> => {
    const res: ErrorableResponse<ISCSessionConfig> = await axios.post(
      `${config.gameElementApiURL}/lesson/${lessonId}/session/config/new/sentenceConstructor`,
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
  gameType: string,
  sessions: ISession[],
  createdAt,
  updatedAt,
}

interface ILessonCreate {
  id: string,
  teacherId: string,
  contentSlug: string,
  gameType: string,
  gameContentJSON?: string,
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

  return data;
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

  return data;
}
//#endregion

export { getGameContentType } from "./cms";
