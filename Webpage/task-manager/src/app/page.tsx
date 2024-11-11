import BetterList from "./components/BetterList";


export default function Home() { 
  return (
    <div>

      <div className = "px-40 pt-10"> 
          <BetterList tasks={[]}/> 
      </div>

    </div>
  );
}
