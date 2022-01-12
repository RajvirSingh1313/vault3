import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type props = {
  storage: Number;
  setStorage: Dispatch<SetStateAction<Number>>;
};

export const StorageContext = createContext<props>({
  storage: 0,
  setStorage: () => {},
});

export const StorageProvider = (props: any) => {
  const [storage, setStorage] = useState<Number>(0);

  return (
    <StorageContext.Provider value={{ storage, setStorage }}>
      {props.children}
    </StorageContext.Provider>
  );
};
