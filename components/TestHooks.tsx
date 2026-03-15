"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
}

export function TestHooks({ label = "Test Hooks" }: Props) {
  const [count, setCount] = useState(0);
  const unusedVariable = "I am never used"; // deliberate lint error: assigned but never read

  return (
    <div className={cn("flex flex-col items-center gap-4 p-6 border border-gray-200 rounded-xl bg-white shadow-sm")}>
      <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
      <p className="text-4xl font-bold text-blue-600">{count}</p>
      <div className="flex gap-2">
        <button
          aria-label="Decrement count"
          onClick={() => setCount((c) => c - 1)}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
        >
          −
        </button>
        <button
          aria-label="Increment count"
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
