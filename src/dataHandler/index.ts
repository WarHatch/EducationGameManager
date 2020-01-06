import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameSessionData, ISessionConfig, ILessonCreateData, ILesson } from "./data";


// Session

export const getSessionData = async (sessionId: string): Promise<IGameSessionData> => {
  const res: AxiosResponse<IGameSessionData> = await axios.post(
    'http://localhost:8090/gameSession/data',
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const getLatestSessionConfig = async (sessionId: string): Promise<ISessionConfig> => {
  const res = await axios.post(
    'http://localhost:8090/gameSession/config',
    {
      sessionId
    }
  );
  const { data } = res;
  return data;
}

export const sendLatestSessionConfig = async (sessionConfig: ISessionConfig): Promise<ISessionConfig> => {
  const res = await axios.post(
    'http://localhost:8090/gameSession/config/new',
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
}

export const createLesson = async (lessonData: ILessonCreateData): Promise<ILesson> => {
  const res: AxiosResponse<ILessonResponse> = await axios.post(
    'http://localhost:8090/lesson/new',
    lessonData,
  );
  const { data } = res;

  const formattedData: ILesson = {
    ...data,
    gameType: JSON.parse(data.gameTypeJSON),
  }

  return formattedData;
}
