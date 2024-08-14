import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <div className='max-w-max p-1 rounded-full h-[40px] flex flex-row bg-neutral-200 items-center gap-2 text-xs'>
            <input type="text" className='hidden lg:block w-full h-full rounded-full pl-5' placeholder='Title , Skill or Company' />
            <input type="text" className='hidden lg:block w-full h-full rounded-full pl-5' placeholder='City , state' />
            <button className='max-w-max px-5 bg-black rounded-full h-full text-white'>Search</button>
        </div>
    )
}

export default Search