import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UsersTable from './components/UsersTable';
import { Provider } from 'react-redux';
//import UserPosts from './UserPosts';
//import NewPost from './NewPost';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Full Stack App</h1>
        </header>
        <main>
          <Provider>
            <UsersTable />
          </Provider>
          <Routes>
            <Route path="/" exact component={UsersTable} />
            {/* <Route path="/user/:userId" component={UserPosts} /> */}
            {/* <Route path="/new-post" component={NewPost} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
