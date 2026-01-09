import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="w-[240px] border-r">
      <div className="flex flex-col gap-[4px] mr-[20px]">
        <NavLink to="/" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>홈</NavLink>
        <NavLink to="/search" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>검색</NavLink>
        <NavLink to="/bookmark" end className={({ isActive }) => `p-[8px] rounded-[8px] ${isActive ? 'font-bold bg-blue-100 text-blue-500' : ''}`}>즐겨찾기</NavLink>
      </div>
    </div>
  );
}
