import { CiSearch } from "react-icons/ci";
import Button from "./Button";

const Search = () => {
    return (
        <div className='max-w-max p-1 rounded-full h-[40px] flex flex-row  items-center gap-2 text-xs'>
            <input type="text" className='hidden lg:block w-full h-full border rounded-full pl-5' placeholder='Title , Skill or Company' />
            <input type="text" className='hidden lg:block w-full h-full rounded-full pl-5 border' placeholder='City , state' />
            {/* <button className='max-w-max px-5 hover:bg-[var(--voilet2)] bg-[var(--voilet)] rounded-full h-full text-white'>Search</button> */}
            <Button className='!h-[35px] text-xs' variant="border">Search</Button>
        </div>
    )
}

export default Search