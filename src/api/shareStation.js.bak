import request from '@/utils/request';

export function getCurrentCityAllStations(areaId) {
  return request({
    url: '/station/getAllStationInfo',
    method: 'post',
    params: { areaId },
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
  return request({
    url: '/station/getStationDetail',
    method: 'post',
    params: { stationId },
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
  return request({
    url: '/station/charging',
    method: '',
    params: { cost },
  });
}

export function getOneStationNumber(mac) {
  return request({
    url: '/station/getNoByMac',
    method: 'post',
    params: { mac },
  });
}
