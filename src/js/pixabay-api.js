// https://pixabay.com/api/?key=44530588-77e4763ebb7280f93ce94dd82&q=yellow+flowers&image_type=photo

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/';
const END_POINT = 'api/';
const KEY = '44530588-77e4763ebb7280f93ce94dd82';

let currentPage = 1;
let totalPages = 0;
const PAGE_SIZE = 15;

export async function getArticles(query,currentPage) {
  
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
  };

  const res = await axios.get(url, options);
  return res.data;
}


