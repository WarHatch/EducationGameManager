const devConfig = {
  gameElementApiURL: "http://localhost:8090",
}

const productionConfig = {
  gameElementApiURL: "http://localhost:8090",
}

const configByEnv = () => {
  if (process.env.NODE_ENV === "production")
    return productionConfig;
  else return devConfig;
};

export default configByEnv();