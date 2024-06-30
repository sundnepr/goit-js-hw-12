import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { articleTemplate } from '/js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallery = new SimpleLightbox('.gallery a');
const loadElem = document.querySelector('.loader');
const listElem = document.querySelector('.img-list');
const BtnLoad = document.querySelector('button[type=button]');
import { getArticles } from './js/pixabay-api';

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
    const data = await getArticles(query, currentPage);
    console.log(data);
    hideSpinner();
    if (data.total == 0) {
      hideLoad();
      iziToast.info({
        title: 'Sorry,',
        message:
          'there are no images matching your search query. Please try again!',
      });
      return;
    }
    totalPages = data.total_pages;
    renderArticles(data.hits);
    showLoad();
    scrollElem();

    if (data.hits.length < 15) {
      hideLoad();
      iziToast.info({
        title: 'info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showSpinner();
    }
  } catch (err) {
    //totalResult = 0;
    iziToast.error({
      title: 'Error1',
      message: err.message,
    });
  }
}

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

BtnLoad.addEventListener('click', async () => {
  showSpinner();
  currentPage++;
  const data = await getArticles(query, currentPage);
  totalPages = data.total_pages;
  renderArticles(data.hits);
  hideSpinner();
  scrollElem();
  console.log(data.hits);
  console.log(data.hits);

  const mas = data.hits;
  if (mas.length < 15) {
    hideLoad();
    iziToast.info({
      title: 'info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showSpinner();
  }
});

function scrollElem() {
  const liEl = listElem.children[0];

  const height = liEl.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
