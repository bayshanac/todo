import { FC, ReactNode } from "react";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return (
    <main className="container-wrapper flex flex-col items-center justify-start bg-white min-h-screen">
      <section className="container flex flex-col items-center">
        <div className="bg-gray-100 rounded-md border border-gray-200 shadow-md shadow-black/5 w-full md:w-2xl p-6 md:p-8 md:mt-6">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AppWrapper;
