const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdAt: Int
    updatedAt: Int
    savedStats: [PlayerStats]
  }

  input StatInput {
    makes: Int
    misses: Int
    shotType: String
    x: Int
    y: Int
    courtLocation: Int
  }

  type PlayerStats {
    statsId: ID
    makes: Int
    misses: Int
    shotType: String
    x: Int
    y: Int
    courtLocation: Int
    createdAt: Int
    updatedAt: Int
  }

  type Preferences {
    preferencesId: ID
    dominantHand: String
    position: String
    team: String
    favTeam: String
    courtColors: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    stats: [PlayerStats]
    preferences: [Preferences] 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, createdAt: Int, updatedAt: Int): Auth
    addStats(makes: Int, misses: Int, shotType: String, x: Int, y: Int, courtLocation: Int): User
    statsInput(input: StatInput): User
    removeRecord(statsId: ID!): PlayerStats
  }
`;

module.exports = typeDefs;
