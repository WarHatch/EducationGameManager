const devConfig = {
  gameElementApiURL: "http://localhost:8090",
}

const productionConfig = {
  gameElementApiURL: "https://education-game-tool-2020.herokuapp.com",
}

const configByEnv = () => {
  if (process.env.NODE_ENV === "production")
    return productionConfig;
  else return devConfig;
};

export default configByEnv();