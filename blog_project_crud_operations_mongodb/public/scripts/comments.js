//file for fetching and saving the comments by using AJAX requests so that
//whole page does not reload and saving bandwidth

const loadCommentsBtnElement = document.getElementById("load-comments-btn");

const commentsSectionElement = document.getElementById("comments");

//Selecting the saving comments form
const commentsFormElement = document.querySelector("#comments-form form");

//selecting the HTML elements which contains info about comment title and comment description
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");

    commentElement.innerHTML = `<article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
            </article>`;

    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;

  const response = await fetch(`/posts/${postId}/comments`, {});

  //response.json() will give us the parsed response body data to javascript object
  const responseData = await response.json();

  if (responseData && responseData.length > 0) {
    const commentListElement = await createCommentsList(responseData);
    //Replacing the comments section content with the new commentListElement content

    //setting the innerHTML of commentsSectionElement to an empty
    //string to remove the content that's currently in it
    commentsSectionElement.innerHTML = "";
    //adding the list of comments to commentsSectionElement
    commentsSectionElement.appendChild(commentListElement);
  }else{
    commentsSectionElement.firstElementChild.textContent="We could not find any comments, maybe add one?";  
  }
}

async function saveComment(event) {
  event.preventDefault(); //it prevents the browser default to sending the request
  //to some server automatically

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const postId = commentsFormElement.dataset.postid;

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  const response = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    //JSON.parse() takes a JSON string and transforms it into a JavaScript object.
    //JSON.stringify takes a javascript object and transforms it into a JSON data format.
    body: JSON.stringify(comment),
    headers: {
      //following👇 code will tell the server that this request carries some
      //JSON DATA
      "Content-Type": "application/json",
    },
  });
  //fetching comments for post
  fetchCommentsForPost();
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);

commentsFormElement.addEventListener("submit", saveComment);
