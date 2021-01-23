// src/ThemeContext.js

import React from "react"
interface User {
  id: string
  name: string
}

export interface PostsContextData {
  user: User
  updateUser: (user: User) => void
}

export const postsContextDefaultValue: PostsContextData = {
  user: {
    id: "",
    name: "",
  },
  updateUser: () => null,
}

export const PostsContext = React.createContext<PostsContextData>(
  postsContextDefaultValue
)
