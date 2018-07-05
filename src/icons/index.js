import Vue from 'vue';
import svgIcon from '@/components/svgIcon';

// register globally

Vue.component('svg-icon', svgIcon);

// webpack help us auto import all svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);

