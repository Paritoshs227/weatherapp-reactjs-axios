import HomePage from "./pages/HomePage";
function App() {
  console.log('parent Component');
  return (
    <div className="w-full h-screen px-3 bg-slate-400">
      <div className="component mx-auto py-5">
        <HomePage />
      </div>
    </div>
  )
}

export default App
