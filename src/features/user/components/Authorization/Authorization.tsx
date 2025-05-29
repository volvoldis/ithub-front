import { useEffect, useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';

import { userGetProfile } from '../../service';

export default function Authorization() {
  const dispatch = useAppDispatch();

  const getProfile = useCallback(async () => {
    await dispatch(userGetProfile());
  }, [dispatch]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return null;
}
