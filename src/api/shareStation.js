import request from '@/utils/request';

export function getCurrentCityAllStations(areaId) {
  return request('/station/getAllStationInfo', { areaId });
}

export function getStationByGPS(radiusValue, lng, lat) {
  const data = {
    radius: radiusValue,
    longtitude: lng,
    latitude: lat,
  };
  return request.post('/station/getStationByGPS', data);
}

export function getNearbyThreeStations(longitude, latitude) {
  const data = {
    longitude,
    latitude,
  };
  return request.post('/station/next3station', data);
}

export function getOneStationDetails(stationId) {
  return request('/station/getStationDetail', { stationId });
}

export function getNearbyOneUsableStation(longitude, latitude, type) {
  const data = {
    longitude,
    latitude,
    type,
  };
  return request('/station/getUsableStation', data);
}

export function bookStation(type, stationId) {
  const data = {
    type,
    stationId,
  };
  return request('/station/bookStation', data);
}

export function updateStationStatus(mac, status) {
  const data = {
    mac,
    status,
  };
  return request('/station/updateStationStatus', data);
}

export function oneTourFeeCharging(cost) {
  return request('/station/charging', { cost });
}

export function getOneStationNumber(mac) {
  return request('/station/getNoByMac', { mac });
}
