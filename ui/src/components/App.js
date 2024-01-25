import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Upload from "./Upload.js";

function Home(){
    return(
        <div>
            <p>Hello React</p>
        </div>
    )
}

export default function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </Router>
    );
}