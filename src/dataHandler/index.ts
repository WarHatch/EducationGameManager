import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameSessionData, ISessionConfig } from "./data";

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

