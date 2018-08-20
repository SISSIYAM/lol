// eslint-disable-next-line
import AMap from 'AMap';

class Map {


  constructor() {
    this.lineArray = [];// 路线数组

    const MapPositionPicker = '';

    this.createMap = (container, zoomLeavel) => {
      const map = new AMap.Map(container, {
        resizeEnable: true,
        zoom: zoomLeavel,
      });

      return map;
    };
    this.setMapCenter = (lng, lat, map, zoomLeavel) => {
      map.setZoomAndCenter(zoomLeavel, [lng, lat]);
    };

    /**
     *
     * 加载高德UI
     *
     * */
    this.loadMapUI = (successCallback) => {
      AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
        this.MapPositionPicker = PositionPicker;
        successCallback();
      });
    };

    /*
    * 创建marker
    * 传入结构：
    * {
    *   map: 地图对象,
    *   lat: 纬度,
    *   lng: 经度，
    *   icon：图标（url）  icon和iconobj同时只能传一个
    *   iconobj: 图标对象，通过createMapIcon创建的对象   icon和iconobj同时只能传一个
    *   title: 标题
    * }
    *
    * clickAction: marker的点击事件
    *
    * */
    this.createMarker = (obj, clickAction) => {
      const marker = new AMap.Marker({
        map: obj.map,
        icon: obj.icon ? obj.icon : obj.iconobj,
        position: [obj.lng, obj.lat],
        title: obj.title,
      });
      marker.on('click', clickAction);
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
    * index: 数组传过来的下标
    * */
    this.beginDrawWalkLine = (obj, successCallback) => {
      const mythis = this;
      AMap.service('AMap.Walking', () => {
        const walk = new AMap.Walking({
          city: obj.city,
          // map: obj.map,
          hideMarkers: true,
          outlineColor: 'black',
        });
        walk.search([obj.startpoi.lng, obj.startpoi.lat], [obj.endpoi.lng, obj.endpoi.lat], (status, results) => {
          console.log('jieguoshi');
          console.log(results);
          let path = [];
          // 计算步行路线
          results.routes[0].steps.forEach((value, index) => {
            path = path.concat(value.path);
          });
          console.log(path);
          mythis.drawWalkLine(obj.map, path);
          successCallback(results, obj.index, obj.tripType);
        });
        mythis.lineArray.push(walk);
      });
    };
    // 绘制步行路线
    this.drawWalkLine = (map, BusArr) => {
      const walkPolyline = new AMap.Polyline({
        map: map,
        path: BusArr,
        showDir:true,
        dirImg:'https://a.amap.com/jsapi_demos/static/images/mass0.png',
        strokeColor: 'lightgray',   // 线颜色
        strokeWeight: 6           // 线宽
      });
      map.setFitView();
      this.lineArray.push(walkPolyline);
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
    this.beginDrawRideLine = (obj, successCallback) => {
      const mythis = this;
      AMap.service('AMap.Riding', () => {
        const ride = new AMap.Riding({
          city: obj.city,
          // map: obj.map,
          hideMarkers: true,
          // outlineColor: 'red',
        });
        ride.search([obj.startpoi.lng, obj.startpoi.lat], [obj.endpoi.lng, obj.endpoi.lat], (status, results) => {
          console.log('骑行');
          console.log(results);
          let path = [];
          // 计算步行路线
          results.routes[0].rides.forEach((value, index) => {
            path = path.concat(value.path);
          });
          successCallback(results, obj.index, obj.tripType);
          mythis.drawBikeLine(obj.map, path);
        });
      });
    };
    // 绘制骑行路线
    this.drawBikeLine = (map, BusArr) => {
      const bikePolyline = new AMap.Polyline({
        map: map,
        path: BusArr,
        strokeColor: "#09f",//线颜色
        strokeOpacity: 0.8,//线透明度
        strokeWeight: 6,
        showDir: true,
      });
      map.setFitView();
      this.lineArray.push(bikePolyline);
    };
    /*
    *
    * 绘制公交
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
    this.beginDrawBus = (obj, lineIndex, successCallback) => {
      const self = this;
      AMap.service('AMap.Transfer', function() { //回调函数
        const bus = new AMap.Transfer({
          city: obj.city,
          // map: obj.map,
          hideMarkers: true,
        });
        //TODO: 使用driving对象调用驾车路径规划相关的功能
        bus.search([obj.startpoi.lng, obj.startpoi.lat], [obj.endpoi.lng, obj.endpoi.lat], function(status, result) {
          console.log('公交');
          console.log(result);
          if (status === 'complete') {
            self.drawBusLine(obj.map, result.plans[lineIndex].path);
            const plan = result.plans[lineIndex];
            const sObj = {
              plan,
              'destination': result.destination,
              'origin': result.origin,
            };
            successCallback(sObj, obj.index, obj.tripType);
          }
        });
      });
    };
    // 设置公交路线的绘制
    this.drawBusLine = (map, BusArr) => {
      const busPolyline = new AMap.Polyline({
        map: map,
        path: BusArr,
        strokeColor: "#FDAEAB",//线颜色
        strokeOpacity: 0.8,//线透明度
        strokeWeight: 6,
        lineJoin: 'round',
        // dirColor: 'pink',
        showDir: true,
      });
      map.setFitView();
      this.lineArray.push(busPolyline);
    };
    /*
    * 清除Marker
    *
    * */
    this.clearMarker = (map, marker) => {
      map.remove(marker);
    };

    /*
    * 清除路线
    *
    * */
    this.clearLine = (map) => {
      console.log('正在清除');
      this.lineArray.forEach((line) => {
        console.log('正在清除');
        // line.clear();
        map.remove(line);
      });
      this.lineArray = [];
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
    this.createMapIcon = (url, size) => {
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
    this.getSearchResults = (city, key, callBack) => {
      AMap.plugin('AMap.Autocomplete', () => {
        const autoOptions = {
          city,
        };
        const autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(key, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          callBack(result.tips);
        });
      });
    };
    /**
     *
     * 创建中心点位置
     *
     * */
    this.createCenterMarker = (map) => {
      const positionPicker = new this.MapPositionPicker({
        mode: 'dragMap',
        map: map,
        iconStyle:{//自定义外观
          url:'http://utsmarthomeplatform.oss-cn-shenzhen.aliyuncs.com/commonFile_uploadFile/fa9c3ce9de17481bb6cd4f90f68b6872.png',//图片地址
          size:[27,48],  //要显示的点大小，将缩放图片
          ancher:[0,0],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        }
      });
      return positionPicker;
    };
    /**
     *
     * 绘制多边形
     *
     * */
    this.drawPolygon = (pos, map) => {
      console.log(pos);
      const polygon = new AMap.Polygon({
        path: pos,
        fillColor: '#F5ADAD', // 多边形填充颜色
        // borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: '#F5ADAD', // 线条颜色
      });
      polygon.setMap(map);
    };


    this.positionStart = (positionPicker) => {
      positionPicker.start();
    };
    this.positionStop = (positionPicker) => {
      positionPicker.stop();
    };
    this.createPoint = (point) => {
      const p = new AMap.LngLat(point.lng, point.lat);
      return p;
    };

  }
}
const mymap = new Map();
export default mymap;
