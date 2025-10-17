import { ChallengeComponent } from "./ChallengeComponent";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Ian Lituchy's Every.io Code Challenge
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ChallengeComponent />
      </main>
    </div>
  );
}

export default App;
