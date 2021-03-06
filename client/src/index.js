import React from 'react';
// import ReactDOM from 'react-dom/client';
//ποΈ 2022λ 3μ 29μΌ μΆμλ React.DOM.renderλ React 18μμλ λμ΄μ μ¬μ© μλ¨.
//react-dom/clientμμ λ°μμμ ν΄κ²°
import * as ReactDOMClient from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'; 
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import { Provider } from "react-redux";


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk) (createStore)

const root = ReactDOMClient.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENTION__ &&
      window.__REDUX_DEVTOOLS_EXTENTION__()
    )}>
    <App />
    </Provider>
  </React.StrictMode>
);




// ReactDOM.render(
//   <Provider
//     store={createStoreWithMiddleware(Reducer,
//         window.__REDUX_DEVTOOLS_EXTENTION__ &&
//         window.__REDUX_DEVTOOLS_EXTENTION__()
//       )}
//   >
//       <App />
//   </Provider>
//   // , document.getElementById('root')
//   );

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
