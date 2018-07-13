// eslint-disable-next-line
import AMap from 'AMap';

class Map {
  constructor() {
    this.lineArray = [];// 路线数组
    this.createMap = function (container, zoomLeavel) {
      const map = new AMap.Map(container, {
        resizeEnable: true,
        zoom: zoomLeavel,
      });

      return map;
    };
    this.setMapCenter = function (lng, lat, map, zoomLeavel) {
      map.setZoomAndCenter(zoomLeavel, [lng, lat]);
    };
    /*
    * 创建marker
    * 传入结构：
    * {
    *   map: 地图对象,
    *   lat: 纬度,
    *   lng: 经度，
    *   icon：图标（url）  icon和iconobj同时只能传一个
    *   iconobj: 图标对象，通过AMap.Icon创建的对象   icon和iconobj同时只能传一个
    *   title: 标题
    * }
    * */
    this.createMarker = function (obj) {
      const marker = new AMap.Marker({
        map: obj.map,
        icon: obj.icon ? obj.icon : obj.iconobj,
        position: [obj.lng, obj.lat],
        title: obj.title,
      });
      return marker;
    };
    /*
    *
    * 绘制步行
    * obj:结构
    * {
    *  map:地图对象,
    *  city:城市名称
    *  startpoi:{
    *   lat:纬度
    *   lng:经度
    *  },
    *  endpoi:{
    *   lat:纬度，
    *   lng:经度
    *  }
    * }
    * */
    this.beginDrawWalkLine = function (obj) {
      const mythis = this;
      AMap.service('AMap.Walking', () => {
        const walk = new AMap.Walking({
          city: obj.city,
          map: obj.map,
          hideMarkers: true,
          outlineColor: 'black',
        });
        walk.search([obj.startpoi.lng, obj.startpoi.lat], [obj.endpoi.lng, obj.endpoi.lat]);
        mythis.lineArray.push(walk);
      });
    };
    /*
    *
    * 绘制骑行
    * obj:结构
    * {
    *  map:地图对象,
    *  city:城市名称
    *  startpoi:{
    *   lat:纬度
    *   lng:经度
    *  },
    *  endpoi:{
    *   lat:纬度，
    *   lng:经度
    *  }
    * }
    * */
    this.beginDrawRideLine = function (obj) {
      const mythis = this;
      AMap.service('AMap.Riding', () => {
        const ride = new AMap.Riding({
          city: obj.city,
          map: obj.map,
          hideMarkers: true,
          outlineColor: 'red',
        });
        ride.search([obj.startpoi.lng, obj.startpoi.lat], [obj.endpoi.lng, obj.endpoi.lat]);
        mythis.lineArray.push(ride);
      });
    };
    /*
    * 清除Marker
    *
    * */
    this.clearMarker = function (map, marker) {
      map.remove(marker);
    };

    /*
    * 清除路线
    *
    * */
    this.clearLine = function () {
      this.lineArray.forEach((line) => {
        line.clear();
      });
    };

    /*
    *
    * 创建AMap.Icon
    * url:图片网址
    * size结构：
    * {
    *    width:宽度
    *    height:高度
    * }
    *
    * */
    this.createMapIcon = function (url, size) {
      const icon = new AMap.Icon({
        image: url,
        imageSize: new AMap.Size(size.width, size.height),
        size: new AMap.Size(size.width, size.height),
      });
      return icon;
    };
    /*
    *
    *
    * 获得地图搜索内容
    * city:搜索城市
    * key：搜索内容
    * callBack：回调函数，将搜索结果返回
    *
    * */
    this.getSearchResults = function (city, key, callBack) {
      AMap.plugin('AMap.Autocomplete', () => {
        const  autoOptions = {
          city,
        };
        const autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(ev.data, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          callBack(result.tips);
        })
      });
    }


  }
}
const mymap = new Map();
export default mymap;
