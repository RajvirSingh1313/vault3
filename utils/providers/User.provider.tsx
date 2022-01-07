import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type User = {
  address: string;
  chainId: number;
};

type props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext<props>({
  user: { address: "", chainId: 0 },
  setUser: () => {},
});

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<User>({
    address: "",
    chainId: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
