import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/';

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});

function get(endpointUrl) {
  return apiClient.get(endpointUrl);
}

const validate = qry => {
  if (!qry) {
    return '';
  }

  if ((typeof qry === 'number' && Number.isInteger(qry)) || Array.isArray(qry)) {
    return `/${qry}`;
  }

  if (typeof qry === 'object') {
    return `/?${Object.keys(qry)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qry[key])}`)
      .join('&')}`;
  }

  throw new Error('As argument use an object, an array, an integer or leave it blank');
};

const getEndpoint = async (endpoint = '', opt = null) => {
  const query = validate(opt);

  try {
    const {data} = await get(endpoint + query);
    return data;
  } catch (e) {
    return {
      status: e.statusCode,
      error: e.data.error,
    };
  }
};

const getCharacter = (opt = {}) => getEndpoint('character', opt);
const getEpisode = (opt = {}) => getEndpoint('episode', opt);

export const UserServices = {
  getEndpoint,
  getCharacter,
  getEpisode,
};
