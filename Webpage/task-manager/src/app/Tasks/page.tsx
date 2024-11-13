import BetterList from "../components/BetterList";
import Link from "next/link";



export default function Tasks() { 
  return (
    <div>

      <div className = "px-40 pt-10"> 
      <Link href="/Tasks">

          <BetterList tasks={[]}/>

      </Link> 
      </div>

    </div>
  );
}
