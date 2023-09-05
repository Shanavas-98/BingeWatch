import { useContext } from 'react';
import ExpandContext from '../context/ExpandProvider';

export default function useExpand() {
  return useContext(ExpandContext);
}
