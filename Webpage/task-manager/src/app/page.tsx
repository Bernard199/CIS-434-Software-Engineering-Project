import Link from "next/link";
import TaskEntry from "./components/TaskEntry";

export default function Index() { 
  return ( 
    <ul
    className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
    <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
      <a onClick={() => }
        className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px] cursor-pointer'>Home</a> {/* Add Home page link */}
    </li>
  </ul>
  );
}
