import axios from 'axios';
export default (options) => axios({ ...options})
  .then(res => res.data);