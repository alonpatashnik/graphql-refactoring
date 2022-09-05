const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input bookParams {
        authors: [String]
        description: String!
        title: String!
        bookId: Int!
        image: String
        link: String
    }

    type User {
        _id: ID!,
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        bookId: Int!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        me: User
        getUsers: [User]
    }

    type Mutation {
        login(email: String, password: String): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: bookParams): User
        removeBook(bookId: Int!): User
    }
`
module.exports = typeDefs