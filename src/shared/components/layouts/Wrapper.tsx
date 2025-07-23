import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </div>
  );
};
