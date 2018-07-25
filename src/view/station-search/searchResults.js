class SearchResults {
  constructor() {
    // searchLocation
    this.searchLocation = {
      lat: '',
      lng: '',
      des: '',
    };
    // 记录是否是搜索界面返回
    this.isSearching = false;
    this.beginLocation = {
      lat: '',
      lng: '',
      des: '我的位置',
    };
    this.endLocation = {
      lat: '',
      lng: '',
      des: '输入终点',
    };
  }
}
const results = new SearchResults();
export default results;
