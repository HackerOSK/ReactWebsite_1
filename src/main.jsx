import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import client from './apolloClient';
import { ethClient } from './apolloClient';
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <ApolloProvider client={ethClient}>
    <App />
    </ApolloProvider>
  </ApolloProvider>
);