import { gql } from 'apollo-server'

export const user = gql`
  scalar DateTime
  type User {
    email: String!
    id: ID!
    name: String
    lastLogin: DateTime
  }

  input UserWhereInput {
    search: String
    name: SearchObj
  }
  input SearchObj {
    contains: String
  }
  type UsersPagination {
    users: [User!]!
    count: Float!
    take: Float!
  }
  input UserUpdateInput {
    name: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserCreateInput {
    email: String!
    password: String!
    name: String
  }
`
