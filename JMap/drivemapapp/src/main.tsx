import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Amplify} from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito:{
      userPoolId: 'ap-southeast-2_wFpqG56oj',
      userPoolClientId: '3g659vcvndv3rg4kfbrfrvka7l',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
