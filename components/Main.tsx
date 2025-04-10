import React from "react";

const Main = (props: any) => {
  const { children } = props;

  return <main className="flex flex-col p-2 flex-1">{children}</main>;
};

export default Main;
