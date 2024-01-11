const config = {
  appUrl: process.env.APP_URL ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? 'development',
  githubClientId: process.env.GITHUB_CLIENT_ID ?? '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
};

export default config;
