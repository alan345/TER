import { gql } from 'apollo-server'

export const query = gql`
  type Query {
    usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
    user(userId: String!): User!

    me: User!
  }
`
