import logo from './logo.svg';
import './App.css';
import song from './audio/PARADISE (COLDPLAY) OK..mp3'

function App() {

  console.log(song)

  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <audio controls src={song}></audio>
      </header>
    </div>
  );
}

export default App;
