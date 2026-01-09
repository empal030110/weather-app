import { NavLink } from 'react-router-dom'
import { CiCloudOn } from "react-icons/ci"
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";

export function Sidebar() {
  return (
    <div className="absolute w-full bottom-0 shrink-0 border-t-[2px] pc:w-[240px] pc:border-r-[2px] pc:border-t-0 pc:py-[20px] border-gray-300 pc:static">
      <div className="flex flex-row justify-center gap-[4px] pc:flex-col pc:mr-[20px]">
        <div className='hidden pc:flex gap-[8px] items-center'>
          <CiCloudOn size={50} />
          <p className='font-bold text-[18px]'>WEATHER</p>
        </div>
        <NavLink to="/" end className={({ isActive }) => `p-[8px] rounded-[8px] flex flex-1 gap-[8px] items-center justify-center text-[16px] pc:justify-start ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>
          <IoHomeOutline />
          <p className='hidden pc:block'>홈</p>
        </NavLink>
        <NavLink to="/search" end className={({ isActive }) => `p-[8px] rounded-[8px] flex flex-1 gap-[8px] items-center justify-center text-[16px] pc:justify-start ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>
          <IoIosSearch />
          <p className='hidden pc:block'>검색</p>
        </NavLink>
        <NavLink to="/bookmark" end className={({ isActive }) => `p-[8px] rounded-[8px] flex flex-1 gap-[8px] items-center justify-center text-[16px] pc:justify-start ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>
          <FaRegBookmark />
          <p className='hidden pc:block'>즐겨찾기</p>
        </NavLink>
      </div>
    </div>
  );
}
