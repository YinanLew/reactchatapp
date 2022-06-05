import React from "react";
import "./app.css";
import SideBar from "./component/sidebar/Sidebar";
import Chat from "./component/chat/Chat";
import {Route, Routes} from "react-router-dom";
import Login from "./component/login/Login";
import {useStateValue} from "./StateProvider";
import Signup from "./component/signup/Signup";

function App() {

    const [{user}, dispatch] = useStateValue();

  return (
    <div className={"app"}>
        {
            !user ? (
                <Login />
            ) : (
                <div className="app__body">
                    <SideBar />
                    <Routes>
                        <Route path={"/rooms/:roomId"} element={<Chat />} />
                        {/*<Route path={"/signup"} element={<Signup />} />*/}
                    </Routes>
                </div>
            )
        }

    </div>
  );
}

export default App;
