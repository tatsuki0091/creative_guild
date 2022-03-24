import React from "react";
import ReactDOM from "react-dom";
import "../css/app.scss";

const App = () => {
    return (
        <>
            <h1>creative Guild test</h1>
            <h1>11122344å</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
            </button>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
