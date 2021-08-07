import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path="/posts/:postId" component={SinglePost}/>
      </Router>
    </AuthProvider>
  );
}

export default App;
