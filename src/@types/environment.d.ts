declare global {
  /* eslint-disable no-unused-vars */
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_API_KEY: string;
    }
  }
}
export {};
