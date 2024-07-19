import React from "react";
import { trpc } from "./utils/trpc";
type ContextType = {
  userId: string;
  name: string;
  updateUserId: () => void;
  isLoading: boolean;
};
export const AppContext = React.createContext<ContextType>({
  userId: "",
  name: "",
  isLoading: false,
  updateUserId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function ContextProvider(props: Props) {
  const workersQuery = trpc.getAuth.useQuery(undefined, { retry: false });
  React.useEffect(() => {
    console.log("useEffect", workersQuery.data);
    setIsLoading(workersQuery.isLoading);
    setName(workersQuery.data?.name ? workersQuery.data.name : "");
    setUserId(workersQuery.data?.id ? workersQuery.data.id : "");
    // if (workersQuery.data) {
    //   console.log("data", workersQuery.data);
    //   // context.updateUserId(workersQuery.data);
    // }
  }, [workersQuery.data]);

  const [userId, setUserId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const updateUserId = () => {
    workersQuery.refetch();
    // setUserId(userId);
  };

  console.log(userId);
  return (
    <AppContext.Provider
      value={{
        userId,
        name,
        isLoading,
        updateUserId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
