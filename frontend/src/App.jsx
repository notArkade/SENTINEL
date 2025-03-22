import Form from "./sections/Form";
import Rings from "./components/Rings";
import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="scroll-hide">
    <div className="min-h-screen bg-black items-center justify-center">
      <Navbar />
      <Hero />
      <Form />
    </div>
    </main>
  );
}

export default App;