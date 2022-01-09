import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type props = {
  files: Array<any>;
  setFiles: Dispatch<SetStateAction<Array<any>>>;
};

export const FileContext = createContext<props>({
  files: [],
  setFiles: () => {},
});

export const FileProvider = (props: any) => {
  const [files, setFiles] = useState<Array<any>>([]);

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {props.children}
    </FileContext.Provider>
  );
};
