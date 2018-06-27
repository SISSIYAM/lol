import request from '@/utils/request';

export function getCurrentCityAllStations(areaId) {
  const data = {
    areaId,
  };
  return request({
    url: '/station/getAllStationInfo',
    method: 'post',
    data,
  });
}

export function getNearbyThreeStations(longitude, latitude) {
  const data = {
    longitude,
    latitude,
  };
  return request({
    url: '/station/next3station',
    method: 'post',
    data,
  });
}

export function getOneStationDetails(stationId) {
  const data = {
    stationId,
  };
  return request({
    url: '/station/getStationDetail',
    method: 'post',
    data,
  });
}

export function getNearbyOneUsableStation(longitude, latitude, type) {
  const data = {
    longitude,
    latitude,
    type,
  };
  return request({
    url: '/station/getUsableStation',
    method: 'post',
    data,
  });
}

export function bookStation(type, stationId) {
  const data = {
    type,
    stationId,
  };
  return request({
    url: '/station/bookStation',
    method: 'post',
    data,
  });
}

export function updateStationStatus(mac, status) {
  const data = {
    mac,
    status,
  };
  return request({
    url: '/station/updateStationStatus',
    method: 'post',
    data,
  });
}

export function oneTourFeeCharging(cost) {
  const data = {
    cost,
  };
  return request({
    url: '/station/charging',
    method: '',
    data,
  });
}

export function getOneStationNumber(mac) {
  const data = {
    mac,
  };
  return request({
    url: '/station/getNoByMac',
    method: 'post',
    data,
  });
}
