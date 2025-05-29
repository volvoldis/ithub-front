import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import type { RootState, AppDispatch } from './appStore';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
