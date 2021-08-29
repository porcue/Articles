const title = document.querySelector('.title');
const about = document.querySelector('.about');
const author = document.querySelector('.author');
const email = document.querySelector('.email');
const comment = document.querySelector('.comment');
const icon = document.querySelector('.icon');

(function loadSecondPage() {
  const params = new URLSearchParams(window.location.search);
  fetch(`https://gorest.co.in/public-api/posts/${params.get('id')}`)
    .then((response) => response.json())
    .then((data) => {
      getArticle(data.data);
    });

  fetch(`https://gorest.co.in/public-api/comments?post_${params.get('id')}`)
    .then((response) => response.json())
    .then((data) => {
      getComments(data.data);
    });
}());

function getComments(data) {
  data.forEach((el) => {
    author.textContent = el.name;
    email.textContent = el.email;
    comment.textContent = el.body;
  });
  icon.classList.add('active');
}

function getArticle(data) {
  title.textContent = data.title;
  about.textContent = data.body;
}
