import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.mainnet.stargaze-apis.com/graphql",
  cache: new InMemoryCache(),
});

export const getTokens = (ownerAddrOrName: string, limit: number = 10) =>
  client.query({
    query: gql`
        query GetTokens {
          tokens(ownerAddrOrName: "${ownerAddrOrName}", limit: ${limit}) {
            tokens {
              id
              metadata
              tokenId
              media {
                type
                urls
                url
              }
              collection {
                contractAddress
                name
              }
            }
          }
        }
      `,
  });
