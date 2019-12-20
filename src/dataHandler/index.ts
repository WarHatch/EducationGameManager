import axios, { AxiosResponse } from "axios";

// interfaces
import { IGameSessionData } from "./data";

const getSessionData = async (): Promise<IGameSessionData> => {
  const res: AxiosResponse<IGameSessionData> = await axios.post(
    'http://localhost:8090/gameSession/data',
    {
      sessionId: "224dc670-2336-11ea-a99f-8d1a44cc7911" //TODO: remove hardcode
    }
  );
  const { data } = res;
  return data;
}

export default {
  getSessionData,
}