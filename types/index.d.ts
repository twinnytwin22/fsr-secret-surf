export {};

declare global {
  interface Window {
    env: any; // 👈️ turn off type checking
  }
}