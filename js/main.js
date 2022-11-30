const userList = document.querySelector(".user_cards_list");
const userListItem = document.querySelector(".user_cards_item");
const postList = document.querySelector(".post_cards_list");
const commentList = document.querySelector(".comment_cards_list");
const globalFragment = document.createDocumentFragment();
const userTemplate = document.querySelector(".user_template").content;

function renderUsers(arr, node) {
  node.innerHTML = "";
  arr.forEach((item) => {
    const clonedUserTemplate = userTemplate.cloneNode(true);
    clonedUserTemplate.querySelector(".user_username").textContent =
      item.username;
    clonedUserTemplate.querySelector(".user_name").textContent = item.name;
    clonedUserTemplate.querySelector(".user_id").textContent = item.id;
    clonedUserTemplate.querySelector(".btn").dataset.id = item.id;
    clonedUserTemplate.querySelector(".user_id").dataset.id = item.id;
    clonedUserTemplate.querySelector(".user_email").textContent = item.email;
    clonedUserTemplate.querySelector(
      ".user_location"
    ).href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
    clonedUserTemplate.querySelector(".user_phone").href = `tel:${
      item.phone.split(" ")[0]
    }`;
    clonedUserTemplate.querySelector(".user_wikipedia").href = item.website;
    clonedUserTemplate.querySelector(".company_info_title").textContent =
      item.company.name;
    clonedUserTemplate.querySelector(".company_info_one").textContent =
      item.company.catchPhrase;
    clonedUserTemplate.querySelector(".company_info_two").textContent =
      item.company.bs;
    globalFragment.appendChild(clonedUserTemplate);
  });
  node.appendChild(globalFragment);
}

function renderPosts(arr, node) {
  node.innerHTML = "";
  const postTemplate = document.querySelector(".post_template").content;
  arr.forEach((item) => {
    const clonedPostTemplate = postTemplate.cloneNode(true);
    clonedPostTemplate.querySelector(".post_title").textContent = item.title;
    clonedPostTemplate.querySelector(".post_desc").textContent = item.body;
    clonedPostTemplate.querySelector(".post_btn").dataset.id = item.id;
    clonedPostTemplate.querySelector(".post_id").textContent = item.id;

    globalFragment.appendChild(clonedPostTemplate);
  });
  node.appendChild(globalFragment);
}

function renderComments(arr, node) {
  node.innerHTML = "";
  const commentTemplate = document.querySelector(".comment_template").content;
  arr.forEach((item) => {
    const clonedCommentTemplate = commentTemplate.cloneNode(true);
    clonedCommentTemplate.querySelector(".comment_title").textContent =
      item.name;
    clonedCommentTemplate.querySelector(".comment_desc").textContent =
      item.body;
    clonedCommentTemplate.querySelector(".comment_id").textContent = item.id;

    globalFragment.appendChild(clonedCommentTemplate);
  });
  node.appendChild(globalFragment);
}

async function renderUrl(url) {
  try {
    const fetchUrl = await fetch(url);
    const res = await fetchUrl.json();
    renderUsers(res, userList);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
renderUrl("https://jsonplaceholder.typicode.com/users");

// async function renderSecondUrl(url) {
//   try {
//     const fetchUrl = await fetch(url);
//     const res = await fetchUrl.json();
//     renderPosts(res, postList);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }

userList.addEventListener("click", (evt) => {
  commentList.innerHTML = "";
  if (evt.target.matches(".btn")) {
    let btnId = Number(evt.target.dataset.id);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        let s = data.filter((item) => item.userId === btnId);
        renderPosts(s, postList);
      });
  }
});
postList.addEventListener("click", (evt) => {
  if (evt.target.matches(".post_btn")) {
    let postBtnId = Number(evt.target.dataset.id);

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        let a = data.filter((item) => item.postId === postBtnId);
        renderComments(a, commentList);
      });
  }
});
