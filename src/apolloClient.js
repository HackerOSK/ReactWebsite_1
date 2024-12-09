import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://6000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzcyOTc3NSwiZXhwIjoxNzMzODE2MTc1fQ.B3PLoZvTwGF04kW547F_tNMG6F2v1EZ10jDSgt92-bAfrczbCzM7_lqi_diPXGEpWUft8Jus-K8slNX87v-mENyYqlf6e3BVwsilu5coMl_mKkvYQhCAy6KzGm2iSdjF20OG8ckcOtnCvgaSKpEoytcZccCnX-fOZToPGRtoYXmDavG7ssjWxMcfP3NTnzkhDbB1uocP8aRUN2wSY5JvFyg3YPntMK0d3KDAL8Jf48S-4oaN6qySTO5RKyvL_OtX-oKBCNFf-VCAWyobX9CfBdMR9VzPZc2ZtDFt2_KDVlNdQxoQ39TPcCGXadOo5-LR2yxnB4Iv1hmd5NtLdeEb3g`, // Include JWT
    },
  }),
  cache: new InMemoryCache(),
});

export const ethClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://5000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzcyOTc3NSwiZXhwIjoxNzMzODE2MTc1fQ.B3PLoZvTwGF04kW547F_tNMG6F2v1EZ10jDSgt92-bAfrczbCzM7_lqi_diPXGEpWUft8Jus-K8slNX87v-mENyYqlf6e3BVwsilu5coMl_mKkvYQhCAy6KzGm2iSdjF20OG8ckcOtnCvgaSKpEoytcZccCnX-fOZToPGRtoYXmDavG7ssjWxMcfP3NTnzkhDbB1uocP8aRUN2wSY5JvFyg3YPntMK0d3KDAL8Jf48S-4oaN6qySTO5RKyvL_OtX-oKBCNFf-VCAWyobX9CfBdMR9VzPZc2ZtDFt2_KDVlNdQxoQ39TPcCGXadOo5-LR2yxnB4Iv1hmd5NtLdeEb3g`, // Include JWT
      },
    }),
    cache: new InMemoryCache(),
  });

export default client;
