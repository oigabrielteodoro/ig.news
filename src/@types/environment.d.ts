declare global {
  /* eslint-disable no-unused-vars */
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_API_KEY: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}
export {};
