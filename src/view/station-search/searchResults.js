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
  }
}
const results = new SearchResults();
export default results;
