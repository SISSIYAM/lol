import request from '@/utils/request';

export function getCurrentCityAllStations(areaId) {
  return request.post('/station/getAllStationInfo', { areaId });
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
  return request.post('/station/getStationDetail', { stationId });
}

export function getNearbyOneUsableStation(longitude, latitude, type) {
  const data = {
    longitude,
    latitude,
    type,
  };
  return request.post('/station/getUsableStation', data);
}

export function bookStation(type, stationId,stationType,timeStamp) {
  const data = {
    type,
    stationId,
    stationType,
    timeStamp,
  };
  console.log(data);
  return request.post('/station/bookStation', data);
}

export function updateStationStatus(mac, status) {
  const data = {
    mac,
    status,
  };
  return request.post('/station/updateStationStatus', data);
}

export function oneTourFeeCharging(cost) {
  return request.post('/station/charging', { cost });
}

export function getOneStationNumber(mac) {
  return request.post('/station/getNoByMac', { mac });
}

export function getUserSearchLog(type) {
  return request.post('/searchLog/getUserSearchLog', { type });
}

export function insertSearchLog(address, value, longitude, latitude) {
  const data = {
    address,
    value,
    longitude,
    latitude,
  };
  return request.post('/searchLog/insertSearchLog', data);
}

