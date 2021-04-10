import gql from 'graphql-tag';

export const GET_ME = gql`
    query {
        me {
            _id
            username
            email
            savedStats {
                statsId
                makes
                misses
                shotType
                x
                y
                courtLocation
            }
        }
    }
`;

export const GET_STATS = gql`
    query {
        stats {
            statsId: ID
            makes: Int
            misses: Int
            points: String
            shotType: String
            x: Int
            y: Int
            courtLocation: Int
            createdAt: Int
            updatedAt: Int
        }
    }
`;