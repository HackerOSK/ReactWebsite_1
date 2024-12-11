// import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { Neo4jGraphQL } from "@neo4j/graphql";
// import neo4j from "neo4j-driver";


// // Define type definitions
// const typeDefs = `#graphql
// type Transaction {
//   hash: String
//   vin: [Vin]
//   vout: [Vout]
//   totalVinValue: Int!
//   totalVoutValue: Int!
//   fee: Int
//   confirmed: Boolean
//   blockHeight: Int
//   involvedCex: CentralizedExchange @relationship(type: "INVOLVES", direction: OUT)
// }

// type Vin {
//   txid: String
//   voutIndex: Int
//   value: Int
//   address: String
// }

// type Vout {
//   value: Int
//   address: String
// }

// type Relationship {
//   source: String!
//   target: String!
//   value: Float!
//   type: String!
// }

// type CentralizedExchange {
//   name: String!
//   website: String
//   twitter: String
//   crunchbase: String
//   linkedin: String
// }

// type Query {
//   transaction(hash: String): Transaction
//   transactions: [Transaction]
//   getTransactionRelations(transactionHash: String!): [Relationship!]!
// }

// type Mutation {
//   mapCexTransaction(fromAddress: String!, toAddress: String!): CentralizedExchange!
// }
// `;

// // Configure Neo4j connection
// const URI = process.env.NEO4J_URI;
// const USER = process.env.NEO4J_USERNAME;
// const PASSWORD = process.env.NEO4J_PASSWORD;

// export const initializeBtcNeo4jServer = async () => {
//   const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

//   // Define resolvers
//   const resolvers = {
//     Transaction: {
//       // Computed field for total value of all vin values
//       totalVinValue: async (parent, args, context) => {
//         const session = driver.session();
//         try {
//           const result = await session.run(
//             `
//               MATCH (t:Transaction {hash: $hash})-[:FUNDS]->(vin:Vin)
//               RETURN sum(vin.value) AS totalVinValue
//             `,
//             { hash: parent.hash }
//           );
//           return result.records[0]?.get("totalVinValue") || 0;
//         } finally {
//           await session.close();
//         }
//       },
  
//       // Computed field for total value of all vout values
//       totalVoutValue: async (parent, args, context) => {
//         const session = driver.session();
//         try {
//           const result = await session.run(
//             `
//               MATCH (t:Transaction {hash: $hash})-[:OUTPUT]->(vout:Vout)
//               RETURN sum(vout.value) AS totalVoutValue
//             `,
//             { hash: parent.hash }
//           );
//           return result.records[0]?.get("totalVoutValue") || 0;
//         } finally {
//           await session.close();
//         }
//       },
  
//       involvedCex: async (parent, args, context) => {
//         const session = driver.session();
//         try {
//           const result = await session.run(
//             `
//               MATCH (t:Transaction {hash: $hash})-[:INVOLVES]->(cex:CentralizedExchange)
//               RETURN cex
//             `,
//             { hash: parent.hash }
//           );
//           return result.records.map((record) => record.get("cex").properties);
//         } finally {
//           await session.close();
//         }
//       },
//     },
  
//     Query: {
//       // Resolver for a single transaction
//       transaction: async (_, { hash }, context) => {
//         const session = driver.session();
//         try {
//           const result = await session.run(
//             `
//               MATCH (t:Transaction {hash: $hash})
//               OPTIONAL MATCH (vin:Vin)-[:FUNDS]->(t)
//               OPTIONAL MATCH (t)-[:OUTPUT]->(vout:Vout)
//               RETURN t, collect(vin) AS vins, collect(vout) AS vouts
//             `,
//             { hash }
//           );
  
//           if (result.records.length === 0) return null;
  
//           const record = result.records[0];
//           const transaction = record.get("t").properties;
//           const vins = record.get("vins").map((vin) => vin.properties);
//           const vouts = record.get("vouts").map((vout) => vout.properties);
  
//           return {
//             ...transaction,
//             vin: vins,
//             vout: vouts,
//           };
//         } finally {
//           await session.close();
//         }
//       },
//       // Resolver for all transactions
//       transactions: async (_, __, context) => {
//         const session = driver.session();
//         try {
//           const result = await session.run(
//             `
//               MATCH (t:Transaction)
//               OPTIONAL MATCH (vin:Vin)-[:FUNDS]->(t)
//               OPTIONAL MATCH (t)-[:OUTPUT]->(vout:Vout)
//               RETURN t, collect(vin) AS vins, collect(vout) AS vouts
//             `
//           );
  
//           return result.records.map((record) => {
//             const transaction = record.get("t").properties;
//             const vins = record.get("vins").map((vin) => vin.properties);
//             const vouts = record.get("vouts").map((vout) => vout.properties);
  
//             return {
//               ...transaction,
//               vin: vins,
//               vout: vouts,
//             };
//           });
//         } finally {
//           await session.close();
//         }
//       },
  
//       getTransactionRelations: async (_, { transactionHash }) => {
//         const session = driver.session();
//         try {
//           // Query for OUTPUT values
//           const outputResult = await session.run(
//             `
//             MATCH (t:Transaction)-[r:OUTPUT]->(a:Vout)
//             WHERE t.hash = $transactionHash
//             RETURN t.hash AS source, a.address AS target, r.value AS value
//             `,
//             { transactionHash }
//           );
  
//           const outputs = outputResult.records.map((record) => ({
//             source: record.get("source"),
//             target: record.get("target"),
//             value: record.get("value"),
//             type: "OUTPUT",
//           }));
  
//           // Query for FUNDS values
//           const fundsResult = await session.run(
//             `
//             MATCH (a:Vin)-[r:FUNDS]->(t:Transaction)
//             WHERE t.hash = $transactionHash
//             RETURN a.address AS source, t.hash AS target, r.value AS value
//             `,
//             { transactionHash }
//           );
  
//           const funds = fundsResult.records.map((record) => ({
//             source: record.get("source"),
//             target: record.get("target"),
//             value: record.get("value"),
//             type: "FUNDS",
//           }));
  
//           // Combine both results
//           return [...outputs, ...funds];
//         } finally {
//           await session.close();
//         }
//       },
//     },
  
//     Mutation: {
//       async mapCexTransaction(_, { fromAddress, toAddress }, context) {
//         const session = driver.session();
  
//         try {
//           const data = await getEntityTransfers(fromAddress, toAddress);
  
//           if (!data || !data.transfers || data.transfers.length === 0) {
//             throw new Error(`No transactions found between ${fromAddress} and ${toAddress}`);
//           }
  
//           const transfer = data.transfers.find(
//             (t) =>
//               t.toAddress &&
//               t.toAddress.arkhamEntity &&
//               t.toAddress.arkhamEntity.type === "cex"
//           );
  
//           if (!transfer) {
//             throw new Error(`No transactions involving a centralized exchange found.`);
//           }
  
//           const cexEntity = transfer.toAddress.arkhamEntity;
  
//           const query = `
//             MATCH (t:Transaction {hash: $hash})
//             MERGE (cex:CentralizedExchange {
//               name: $name,
//               website: $website,
//               twitter: $twitter,
//               crunchbase: $crunchbase,
//               linkedin: $linkedin
//             })
//             MERGE (t)-[:INVOLVES]->(cex)
//             RETURN cex
//           `;
  
//           const params = {
//             hash: transfer.txid,
//             name: cexEntity.name,
//             website: cexEntity.website || null,
//             twitter: cexEntity.twitter || null,
//             crunchbase: cexEntity.crunchbase || null,
//             linkedin: cexEntity.linkedin || null,
//           };
  
//           const result = await session.run(query, params);
  
//           return result.records[0].get("cex").properties;
//         } finally {
//           await session.close();
//         }
//       },
//     },
//   };

//   try {
//     const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

//     const server = new ApolloServer({
//       schema: await neoSchema.getSchema(),
//     });

//     const { url } = await startStandaloneServer(server, {
//       listen: { port: 6000 },
//       path: '/graphql',
//       cors: {
//         origin: 'https://5173-idx-backend-1732621450997.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev',
//         credentials: true,
//       },
//     });
    
    

//     console.log(`🚀 GraphQL Server ready at ${url}`);
//   } catch (err) {
//     console.error(`Error starting server: ${err.message}`);
//     await driver.close();
//   }
// };



import { ApolloServer } from '@apollo/server';

import { Neo4jGraphQL } from '@neo4j/graphql';
import neo4j from 'neo4j-driver';
import gql from 'graphql-tag';

export const initializeBtcNeo4jServer = async () => {
const typeDefs = `#graphql
type Transaction {
  hash: String
  vin: [Vin]
  vout: [Vout]
  totalVinValue: Float
  totalVoutValue: Float
  fee: Int
  confirmed: Boolean
  blockHeight: Int
  anomaly: Boolean
  involvedCex: CentralizedExchange @relationship(type: "INVOLVES", direction: OUT)
}

type Vin {
  txid: String
  voutIndex: Int
  value: String
  address: String
}

type Vout {
  value: Int
  address: String
}

type Relationship {
  source: String!
  target: String!
  value: Float!
  type: String!
}

type CentralizedExchange {
  name: String!
  website: String
  twitter: String
  crunchbase: String
  linkedin: String
}

type CexTransaction {
  vin: Vin
  transaction: Transaction
  centralizedExchange: CentralizedExchange
}

type Query {
  transaction(hash: String): Transaction
  transactions: [Transaction]
  getTransactionRelations(transactionHash: String!): [Relationship!]!
  getCexTransactions: [CexTransaction!]!
  
}

type Mutation {
  mapCexTransaction(fromAddress: String!, toAddress: String!): CentralizedExchange!
}
`;

// resolvers.js
const resolvers = {
  Transaction: {
    // Computed field for total value of all vin values
    totalVinValue: async (parent, args, context) => {
      const session = driver.session();
      try {
        const result = await session.run(
          `
          MATCH (t:Transaction {hash: $hash}) RETURN t.totalVinValue AS totalVinValue
          `,
          { hash: parent.hash }
        );
        return result.records[0]?.get("totalVinValue") || 0;
      } finally {
        await session.close();
      }
    },

    // Computed field for total value of all vout values
    totalVoutValue: async (parent, args, context) => {
      const session = driver.session();
      try {
        const result = await session.run(
          `
            MATCH (t:Transaction {hash: $hash}) RETURN t.totalVoutValue AS totalVoutValue
          `,
          { hash: parent.hash }
        );
        return result.records[0]?.get("totalVoutValue") || 0;
      } finally {
        await session.close();
      }
    },

    involvedCex: async (parent, args, context) => {
      const session = driver.session();
      try {
        const result = await session.run(
          `
            MATCH (t:Transaction {hash: $hash})-[:INVOLVES]->(cex:CentralizedExchange)
            RETURN cex
          `,
          { hash: parent.hash }
        );
        return result.records.map((record) => record.get("cex").properties);
      } finally {
        await session.close();
      }
    },
  },

  Query: {
    // Resolver for a single transaction
    transaction: async (_, { hash }, context) => {
      const session = driver.session();
      try {
        const result = await session.run(
          `
            MATCH (t:Transaction {hash: $hash})
            OPTIONAL MATCH (vin:Vin)-[:FUNDS]->(t)
            OPTIONAL MATCH (t)-[:OUTPUT]->(vout:Vout)
            RETURN t, collect(vin) AS vins, collect(vout) AS vouts
          `,
          { hash }
        );

        if (result.records.length === 0) return null;

        const record = result.records[0];
        const transaction = record.get("t").properties;
        const vins = record.get("vins").map((vin) => vin.properties);
        const vouts = record.get("vouts").map((vout) => vout.properties);

        return {
          ...transaction,
          vin: vins,
          vout: vouts,
        };
      } finally {
        await session.close();
      }
    },

    getCexTransactions: async (_, __, context) => {
      const session = driver.session();

      try {
        const result = await session.run(`
          MATCH (vin:Vin)-[:SENT_TO]->(t:Transaction)-[:INVOLVES]->(cex:CentralizedExchange)
          OPTIONAL MATCH (t)-[:OUTPUT]->(vout:Vout)
          RETURN vin, t, cex, collect(vout) AS vouts
        `);

        return result.records.map((record) => ({
          vin: record.get("vin").properties,
          transaction: {
            ...record.get("t").properties,
            vouts: record.get("vouts").map((vout) => vout.properties),
          },
          centralizedExchange: record.get("cex").properties,
        }));
      } finally {
        await session.close();
      }
    },

    // Resolver for all transactions
    transactions: async (_, __, context) => {
      const session = driver.session();
      try {
        const result = await session.run(
          `
            MATCH (t:Transaction)
            OPTIONAL MATCH (vin:Vin)-[:FUNDS]->(t)
            OPTIONAL MATCH (t)-[:OUTPUT]->(vout:Vout)
            RETURN t, collect(vin) AS vins, collect(vout) AS vouts
          `
        );

        return result.records.map((record) => {
          const transaction = record.get("t").properties;
          const vins = record.get("vins").map((vin) => vin.properties);
          const vouts = record.get("vouts").map((vout) => vout.properties);

          return {
            ...transaction,
            vin: vins,
            vout: vouts,
          };
        });
      } finally {
        await session.close();
      }
    },

    getTransactionRelations: async (_, { transactionHash }) => {
      const session = driver.session();
      try {
        // Query for OUTPUT values
        const outputResult = await session.run(
          `
          MATCH (t:Transaction)-[r:OUTPUT]->(a:Vout)
          WHERE t.hash = $transactionHash
          RETURN t.hash AS source, a.address AS target, r.value AS value
          `,
          { transactionHash }
        );

        const outputs = outputResult.records.map((record) => ({
          source: record.get("source"),
          target: record.get("target"),
          value: record.get("value"),
          type: "OUTPUT",
        }));

        // Query for FUNDS values
        const fundsResult = await session.run(
          `
          MATCH (a:Vin)-[r:FUNDS]->(t:Transaction)
          WHERE t.hash = $transactionHash
          RETURN a.address AS source, t.hash AS target, r.value AS value
          `,
          { transactionHash }
        );

        const funds = fundsResult.records.map((record) => ({
          source: record.get("source"),
          target: record.get("target"),
          value: record.get("value"),
          type: "FUNDS",
        }));

        // Combine both results
        return [...outputs, ...funds];
      } finally {
        await session.close();
      }
    },
  },

  Mutation: {
    async mapCexTransaction(_, { fromAddress, toAddress }, context) {
      const session = driver.session();

      try {
        const data = await getEntityTransfers(fromAddress, toAddress);

        if (!data || !data.transfers || data.transfers.length === 0) {
          throw new Error(`No transactions found between ${fromAddress} and ${toAddress}`);
        }

        const transfer = data.transfers.find(
          (t) =>
            t.toAddress &&
            t.toAddress.arkhamEntity &&
            t.toAddress.arkhamEntity.type === "cex"
        );

        if (!transfer) {
          throw new Error(`No transactions involving a centralized exchange found.`);
        }

        const cexEntity = transfer.toAddress.arkhamEntity;

        const query = `
          MATCH (t:Transaction {hash: $hash})
          MERGE (cex:CentralizedExchange {
            name: $name,
            website: $website,
            twitter: $twitter,
            crunchbase: $crunchbase,
            linkedin: $linkedin
          })
          MERGE (t)-[:INVOLVES]->(cex)
          RETURN cex
        `;

        const params = {
          hash: transfer.txid,
          name: cexEntity.name,
          website: cexEntity.website || null,
          twitter: cexEntity.twitter || null,
          crunchbase: cexEntity.crunchbase || null,
          linkedin: cexEntity.linkedin || null,
        };

        const result = await session.run(query, params);

        return result.records[0].get("cex").properties;
      } finally {
        await session.close();
      }
    },
  },
};





// Configure Neo4j database connection
const URI = "neo4j+s://2bdd9fa8.databases.neo4j.io";
const USER = "neo4j";
const PASSWORD = "z69lmWz8lKxhthKw3sk7vv62pWjGgBp51z96Yg88apw";
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

// // Initialize Neo4jGraphQL
// const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers });

// // Create Apollo Server with Next.js integration

// let server;

//     // Create the Apollo server
//     server = new ApolloServer({
//       schema: await neoSchema.getSchema(),
      
//     });
//     export default startServerAndCreateNextHandler(server);
//     // console.log(`🚀 Server ready at ${url}`);

try {
  const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

  const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 6000 },
    path: '/graphql',
    cors: {
      origin: 'https://5173-idx-backend-1732621450997.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev',
      credentials: true,
    },
  });
  
  

  console.log(`🚀 GraphQL Server ready at ${url}`);
} catch (err) {
  console.error(`Error starting server: ${err.message}`);
  await driver.close();
}



}