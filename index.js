const input = document.querySelector('.search');
const btn = document.querySelector('.button');
const list = document.querySelector('.articles');
const text = document.querySelector('.text');
let page = 1;

function initArticles() {
  fetch(`https://gorest.co.in/public-api/posts?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      updateInfo(data);
      updatePosts(data.data);
    });
}

function updateInfo(data) {
  if (page > data.meta.pagination.pages) {
    input.value = '';
    alert('Некорректное значение номера страницы!');
  } else {
    text.textContent = `Общее кол-во статей: ${data.meta.pagination.total},
    Общее кол-во страниц: ${data.meta.pagination.pages}, Текущая страница: ${data.meta.pagination.page}`;
  }
}

function updatePosts(items) {
  items.forEach((el) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.classList.add('anchor');
    anchor.href = `index-2.html?id=${el.id}`;
    anchor.textContent = `Статья № ${el.id}`;
    item.append(anchor);
    list.append(item);
  });
}

initArticles();

function searchArticle() {
  list.innerHTML = '';
  page = input.value;
  initArticles();
}

btn.addEventListener('click', searchArticle);
