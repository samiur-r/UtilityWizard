const config = {
  appUrl: process.env.APP_URL ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendDeliveryEmail: process.env.RESEND_DELIVERY_EMAIL ?? "",
};

export default config;
