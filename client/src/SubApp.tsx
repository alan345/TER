import BackgroundPage from "./template/BackgroundPage";
import { Users } from "./user/Users";
import { AuthManagementParent } from "./auth/AuthManagementParent";
import { Beers } from "./beer/Beers";

export function SubApp() {
  return (
    <BackgroundPage>
      <AuthManagementParent />
      <Users />
      <div className="h-80" />
      <Beers />
    </BackgroundPage>
  );
}
