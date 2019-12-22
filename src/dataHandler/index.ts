import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameSessionData } from "./data";

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
