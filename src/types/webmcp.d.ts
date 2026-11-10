import "react";

declare global {
  interface Navigator {
    modelContext?: {
      provideContext?: (ctx: {
        tools: Array<{ name: string; description: string }>;
      }) => void;
      registerTool: (tool: {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
      }) => void;
      unregisterTool?: (name: string) => void;
    };
  }
}

declare module "react" {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
}

export {};
