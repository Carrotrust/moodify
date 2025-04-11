import React, { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = (props: MainProps) => {
  const { children } = props;

  return <main className="flex flex-col p-2 flex-1">{children}</main>;
};

export default Main;
