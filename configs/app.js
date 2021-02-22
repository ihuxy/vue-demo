const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||8500,
  PRO_PORT:process.env.PRO_PORT||8501,
  BUILD_DIR:'../build',//'build',
  DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PRD_ROOT_DIR:'',//'/test1',
  DEFAULT_TOKEN:'Basic 123456',
  PROXY_URI:'http://47.105.94.51:9202',
  // PROXY_URI:'http://127.0.0.1:9202',
  SALT:'yiru',
  TOKEN_SECRET:'yiru',
  mongoUrl:'mongodb://localhost:27017/test',
  serverUrl:'http://localhost:8500',
  serverPort:9202,
  basepath:'/',
  platform:'pc',
  appNane:'...',
  publicPath:'http://localhost:8500/',
};

module.exports=app;
