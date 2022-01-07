import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ImageKey = {
  fileData: any;
  byteData: string | unknown | undefined;
};

type props = {
  imageKey: ImageKey | undefined;
  setImageKey: Dispatch<SetStateAction<ImageKey | undefined>>;
};

export const ImageKeyContext = createContext<props>({
  imageKey: undefined,
  setImageKey: () => {},
});

export const ImageKeyProvider = (props: any) => {
  const [imageKey, setImageKey] = useState<ImageKey | undefined>(undefined);

  return (
    <ImageKeyContext.Provider value={{ imageKey, setImageKey }}>
      {props.children}
    </ImageKeyContext.Provider>
  );
};
