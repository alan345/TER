import React from "react";
import { trpc } from "./utils/trpc";
type ContextType = {
  userId: string;
  name: string;
  updateUserId: () => void;
  isLoading: boolean;
};
const initialContext: ContextType = {
  userId: "",
  name: "",
  isLoading: false,
  updateUserId: () => {},
};
export const AppContext = React.createContext<ContextType>(initialContext);

type Props = {
  children: React.ReactNode;
};

export default function ContextProvider(props: Props) {
  const workersQuery = trpc.getAuth.useQuery(undefined, { retry: false });

  const [userId, setUserId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const updateUserId = async () => {
    await workersQuery.refetch();
  };

  React.useEffect(() => {
    setIsLoading(workersQuery.isLoading);
    if (workersQuery.isError) {
      setName("");
      setUserId("");
      return;
    }
    setName(workersQuery.data?.name ? workersQuery.data.name : "");
    setUserId(workersQuery.data?.id ? workersQuery.data.id : "");
  }, [workersQuery]);

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
