import './App.css'

function App() {
  return (
    <>
      <h1>REACT MICRO</h1>
      <button
        onClick={() => {
          history.pushState(null, '', '/')
        }}
      >
        to /
      </button>
    </>
  )
}

export default App
