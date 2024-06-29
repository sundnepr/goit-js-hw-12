import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { articleTemplate } from '/js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallery = new SimpleLightbox('.gallery a');
const loadElem = document.querySelector('.loader');
const BtnLoad = document.querySelector('button[type=button]');
import { getArticles } from "./js/pixabay-api";


hideSpinner();
hideLoad();

const refs = {
  formElem: document.querySelector('.js-search-form'),
  articleListElem: document.querySelector('.js-article-list'),
  btnLoadMore: document.querySelector('.js-btn-load'),
  loadElem: document.querySelector('.js-loader'),
};

let query = '';
let currentPage = 1;
let totalPages = 0;
const PAGE_SIZE = 15;



// ==========================================
refs.formElem.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  // showSpinner();
  currentPage = 1;
  refs.articleListElem.innerHTML = '';
  
  const ok = query.trim() !== '';
  if (!ok) {
        hideSpinner();
        hideLoad();
        iziToast.error({
            message: 'Info Search input must be filled!',
        });

        return;
    }
   try {
  const data = await getArticles(query,currentPage);
  hideSpinner();
      if (data.total == 0) {
         iziToast.info({
        title: 'Sorry,',
        message: "there are no images matching your search query. Please try again!",
      });
    }
 totalPages = data.total_pages;
  renderArticles(data.hits);
  // updateStatusObserver();
  hideSpinner();
  showLoad();

   }
   catch (err) {
        newsApi.totalResult = 0;
        iziToast.error({
          title: 'Error1',
          message: err.message,
        });
      }
  

    
  if (currentPage == data.total_pages) { 
    iziToast.info({
      title: "info",
      message: "Were sorry, but you've reached the end of search results.",
    })

    }

}


// async function onFormSubmit(e) {

//   e.preventDefault();
//   showSpinner();

//   newsApi.query = e.target.elements.query.value.trim();
//   newsApi.page = 1;
  
//   refs.articleListElem.innerHTML = '';
  
//   const ok = newsApi.query.trim() !== '';
//    if (!ok) {
//         hideSpinner();
//         iziToast.error({
//             message: 'Info Search input must be filled!',
//         });
//         return;
//     }

//   try {
//     const data = await newsApi.getArticles();
//     hideSpinner();
//     if (data.total == 0) {
//        iziToast.info({
//       title: 'Sorry,',
//       message: "there are no images matching your search query. Please try again!",
//     });

//     }
  
//     newsApi.totalResult = data.totalResults;

//     renderArticles(data.hits);
//   } catch (err) {
//     newsApi.totalResult = 0;
//     iziToast.error({
//       title: 'Error1',
//       message: err.message,
//     });
//   }
// 
//   hideSpinner();
// }

function articlesTemplate(articles) {
  return articles.map(articleTemplate).join('');
}

function renderArticles(articles) {
  const markup = articlesTemplate(articles);
  refs.articleListElem.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function showSpinner() {
  loadElem.classList.remove('visually-hidden');
}

function hideSpinner() {
  loadElem.classList.add('visually-hidden');
}

function showLoad() {
  BtnLoad.classList.remove('visually-hidden');
}

function hideLoad() {
  BtnLoad.classList.add('visually-hidden');
}


const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

console.log("shut down");
  
BtnLoad.addEventListener('click', async () => { 
 
 // query = e.target.elements.query.value.trim();
  showSpinner();
  currentPage ++;
  console.log("load++++");
  const data = await getArticles(query,currentPage);
  totalPages = data.total_pages;
  renderArticles(data.hits);
  // updateStatusObserver();
  hideSpinner();
  if (currentPage == data.total_pages) { 
    iziToast.info({
      title: "info",
      message: "Were sorry, but you've reached the end of search results.",
    })
    hideLoad();
    }
})