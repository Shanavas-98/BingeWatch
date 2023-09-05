import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import { AuthProvider } from './context/AuthProvider';
import { ExpandProvider } from './context/ExpandProvider';
import { ChatProvider } from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider>
          <AuthProvider>
            <ChatProvider>
              <ExpandProvider>
                <App />
              </ExpandProvider>
            </ChatProvider>
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
