// https://pixabay.com/api/?key=44530588-77e4763ebb7280f93ce94dd82&q=yellow+flowers&image_type=photo

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/';
const END_POINT = 'api/';
const KEY = '44530588-77e4763ebb7280f93ce94dd82';
const options = {
  // headers: {
  //   'Key': 'key=44530588-77e4763ebb7280f93ce94dd82',
  
  // },
};

// export class NewsAPI {
//   query = '';
//   #pageSize = 10;
//   page = 1;
//   total_pages = 1;

//   getArticles() {
//     const PARAMS = new URLSearchParams({
//       key: KEY,
//       q: this.query,
//       image_type:  "photo",
//       orientation: "horizontal",
//       safesearch: true,
//     });
    
//     const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
//     console.log(url);
//     return fetch(url, options).then(res => res.json());
//   }

//   get pageSize() {
//     return this.#pageSize;
//   }
// }

// let query = 'Elon Musk';
let currentPage = 1;
let totalPages = 0;
const PAGE_SIZE = 15;

export async function getArticles(query,currentPage) {
  // const BASE_URL = `${BASE_URL}${END_POINT}?${PARAMS}`;
  // const END_POINT = '/search';
  const PARAMS = new URLSearchParams({
      key: KEY,
      q: query,
      image_type:  "photo",
      orientation: "horizontal",
      safesearch: true,
      page: currentPage,
      per_page: 15,
    });

  const url = `${BASE_URL}${END_POINT}?${PARAMS}`;

  const options = {
    params: {
      q: query,
      page: currentPage,
      page_size: PAGE_SIZE,
      per_page: 15,
      
    },
  };
    console.log("shut down");
  const res = await axios.get(url, options);
  return res.data;
}
