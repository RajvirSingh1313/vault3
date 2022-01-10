import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type props = {
  queriedFiles: Array<any>;
  setQueriedFiles: Dispatch<SetStateAction<Array<any>>>;
};

export const QueriedFilesContext = createContext<props>({
  queriedFiles: [],
  setQueriedFiles: () => {},
});

export const QueriedFilesProvider = (props: any) => {
  const [queriedFiles, setQueriedFiles] = useState<Array<any>>([]);

  return (
    <QueriedFilesContext.Provider value={{ queriedFiles, setQueriedFiles }}>
      {props.children}
    </QueriedFilesContext.Provider>
  );
};
