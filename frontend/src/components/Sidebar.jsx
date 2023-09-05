import React, {
  createContext, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import useExpand from '../hooks/useExpand';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { expand, setExpand } = useExpand();
  const contextValue = useMemo(() => ({ expand }), [expand]);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-800 border-r shadow-sm">
        <div className="p-4 flex items-center">
          <div className="px-2">
            <img src="/images/bingewatch_logo.png" alt="" className="w-7 h-7" />
          </div>
          <span
            className={`font-bold overflow-hidden transition-all text-white ${
              expand ? 'w-24' : 'w-0'
            }`}
          >
            BingeWatch
          </span>
          <button
            type="button"
            onClick={() => setExpand(!expand)}
            className="text-white hover:scale-150"
          >
            {expand ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <SidebarContext.Provider value={contextValue}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon, text, active, alert,
}) {
  SidebarItem.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    alert: PropTypes.string,
  };
  SidebarItem.defaultProps = {
    active: false,
    alert: '',
  };
  const { expand } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-slate-600 to-slate-500 text-gray-300'
            : 'hover:bg-gray-600 text-gray-300'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expand ? 'w-28 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-slate-700 ${
            expand ? '' : 'top-2'
          }`}
        />
      )}

      {!expand && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-slate-400 text-slate-700 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
