import type { Handler, HandlerEvent } from "@netlify/functions";

/**
 * Tina CMS Netlify Function
 * 
 * For production, it's recommended to use Tina Cloud instead of this function.
 * To use Tina Cloud:
 * 1. Sign up at https://tina.io
 * 2. Connect your GitHub repo
 * 3. Set VITE_TINA_CLIENT_ID and TINA_TOKEN in Netlify environment variables
 * 
 * This function is a placeholder for self-hosted setups.
 */
export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // For self-hosted setup, you would implement the Tina CMS backend here
  // For now, redirect to using Tina Cloud
  return {
    statusCode: 501,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      error: "Tina CMS backend not configured. Please use Tina Cloud or configure a self-hosted backend.",
      message: "See https://tina.io/docs for setup instructions",
    }),
  };
};

