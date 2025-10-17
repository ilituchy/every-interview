import { ChallengeComponent } from "./ChallengeComponent";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6">
        <div className="flex items-center ml-6">
          <h1 className="text-2xl font-bold">
            Ian Lituchy's Every.io Code Challenge
          </h1>
        </div>
      </header>
      <main className="w-full max-w-[calc(100vw-50px)] mx-auto bg-gray-50 border border-black shadow-lg rounded-[40px] mt-4">
        <ChallengeComponent />
      </main>
    </div>
  );
}

export default App;
