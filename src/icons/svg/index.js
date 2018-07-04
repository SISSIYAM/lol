import svgIcon from '@/components/svgIcon/index';

// register globally
const svgIconComponent = {
  install(Vue) {
    Vue.component('svg-icon', svgIcon);
  },
};
// webpack help us auto import all svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);
export default svgIconComponent;
