// src/ThemeContext.js

import React from "react"
// import { User } from "./pages/model/User"

// export interface PostsContextData {
//   user: User
//   updateUser: (user: User) => void
// }

export const postsContextDefaultValue: any = {
  user: {
    id: "",
    name: "",
    email: "",
  },
  updateUser: () => null,
}

export const PostsContext = React.createContext<any>(postsContextDefaultValue)
