import React from "react";
import { User, userClass } from "./pages/user/User.type";

export interface PostsContextData {
  user: User;
  updateUser: (user: User) => void;
}

export const postsContextDefaultValue: PostsContextData = {
  user: userClass,
  updateUser: () => null,
};

export const PostsContext = React.createContext<PostsContextData>(
  postsContextDefaultValue
);
