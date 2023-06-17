import "./App.css";
import WeatherSearch from "./components/search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World!</p>
      </header>
      <WeatherSearch /> {/* Include the WeatherSearch component */}
    </div>
  );
}

export default App;
