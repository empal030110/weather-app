import { NavLink } from 'react-router-dom'
import { CiCloudOn } from "react-icons/ci"

export function Sidebar() {
  return (
    <div className="w-[240px] border-r-[2px] border-gray-300">
      <div className="flex flex-col gap-[4px] mr-[20px]">
        <div className='flex gap-[8px] items-center'>
          <CiCloudOn size={50} />
          <p className='font-bold text-[18px]'>WEATHER</p>
        </div>
        <NavLink to="/" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>홈</NavLink>
        <NavLink to="/search" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>검색</NavLink>
        <NavLink to="/bookmark" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>즐겨찾기</NavLink>
      </div>
    </div>
  );
}
