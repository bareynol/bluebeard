import React, { useCallback, useEffect } from 'react';
import { getServerStats, getHardware, getDisks, getServices } from 'services/serverStats/actions';
import { getTorrents } from 'services/torrents/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function RefreshData() {
  let refreshHardwareTimer: any = null;
  let refreshDiskTimer: any = null;
  let refreshServiceTimer: any = null;
  let refreshTorrentTimer: any = null;

  const isFetchingStats = useSelector(state => state.serverStats.isFetching);
  const isFetchingTorrents = useSelector(state => state.torrents.isFetching);
  
  const dispatch = useDispatch();

  const fetchHardware = useCallback(() => dispatch(getHardware), [dispatch]);
  const fetchDisks = useCallback(() => dispatch(getDisks), [dispatch]);
  const fetchServices = useCallback(() => dispatch(getServices), [dispatch]);
  const fetchTorrents = useCallback(() => !isFetchingTorrents && dispatch(getTorrents()), [dispatch]);

  function refreshHardware() {
    clearTimeout(refreshHardwareTimer);
    console.log("fetching Hardware")
    fetchHardware();
    refreshHardwareTimer = setTimeout(refreshHardware, 5000);
  }

  function refreshTorrents() {
    clearTimeout(refreshTorrentTimer);
    console.log("fetching Torrents")
    fetchTorrents();
    refreshTorrentTimer = setTimeout(refreshTorrents, 5000);
  }

  function refreshDisks() {
    clearTimeout(refreshDiskTimer);
    console.log("fetching Disks")
    fetchDisks();
    refreshDiskTimer = setTimeout(refreshDisks, 60000);
  }

  function refreshServices() {
    clearTimeout(refreshServiceTimer);
    console.log("fetching Services")
    fetchServices();
    refreshServiceTimer = setTimeout(refreshServices, 60000);
  }

  useEffect(() => {
    refreshHardware();
    refreshTorrents();
    refreshDisks();
    refreshServices();

    return () => {
      console.log("clearing refreshData timer")
      clearTimeout(refreshHardwareTimer);
      clearTimeout(refreshTorrentTimer);
      clearTimeout(refreshDiskTimer);
      clearTimeout(refreshServiceTimer);
    }

  }, []);

  return null;
}