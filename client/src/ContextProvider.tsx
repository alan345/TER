import React from "react";
import { trpc } from "./utils/trpc";
type ContextType = {
  userId: string;
  updateUserId: () => void;
  isLoading: boolean;
};
export const AppContext = React.createContext<ContextType>({
  userId: "",
  isLoading: false,
  updateUserId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function ContextProvider(props: Props) {
  const workersQuery = trpc.getAuthId.useQuery(undefined, { retry: false });
  React.useEffect(() => {
    console.log("useEffect", workersQuery.data);
    setIsLoading(workersQuery.isLoading);
    setUserId(workersQuery.data ? workersQuery.data : "");
    // if (workersQuery.data) {
    //   console.log("data", workersQuery.data);
    //   // context.updateUserId(workersQuery.data);
    // }
  }, [workersQuery.data]);

  const [userId, setUserId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const updateUserId = () => {
    workersQuery.refetch();
    // setUserId(userId);
  };

  console.log(userId);
  return (
    <AppContext.Provider
      value={{
        userId,
        isLoading,
        updateUserId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
