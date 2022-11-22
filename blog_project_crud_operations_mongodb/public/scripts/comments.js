const loadCommentsBtnElement = document.getElementById("load-comments-btn");

const commentsSectionElement=document.getElementById("comments");

function createCommentsList(comments){
    const commentListElement=document.createElement("ol");

    for(const comment of comments){
        const commentElement=document.createElement("li");

        commentElement.innerHTML=`<article class="comment-item">
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
  const commentListElement= await createCommentsList(responseData);

//   Replacing the comments section content with the new commentListElement content

//setting the innerHTML of commentsSectionElement to an empty
//string to remove the content that's currently in it

commentsSectionElement.innerHTML="";

//adding the list of comments to commentsSectionElement
commentsSectionElement.appendChild(commentListElement);
  
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
