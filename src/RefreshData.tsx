import React, { useCallback, useEffect } from 'react';
import { getServerStats } from 'services/serverStats/actions';
import { getTorrents } from 'services/torrents/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function RefreshData() {
  let refreshTimer = null;

  const isFetchingStats = useSelector(state => state.serverStats.isFetching);
  const isFetchingTorrents = useSelector(state => state.torrents.isFetching);
  
  const dispatch = useDispatch();

  const fetchStats = useCallback(() => !isFetchingStats && dispatch(getServerStats), [dispatch]);
  const fetchTorrents = useCallback(() => !isFetchingTorrents && dispatch(getTorrents()), [dispatch]);

  function fetchAll() {
    clearTimeout(refreshTimer);
    console.log("fetching data")
    fetchStats();
    fetchTorrents();
    refreshTimer = setTimeout(fetchAll, 5000);
  }

  useEffect(() => {
    fetchAll();

    return () => {
      console.log("clearing refreshData timer")
      clearTimeout(refreshTimer);
    }

  }, []);

  return null;
}