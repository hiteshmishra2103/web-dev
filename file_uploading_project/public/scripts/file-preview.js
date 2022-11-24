//Selecting file picker input element
const filePickerElement=document.getElementById("image");

const imagePreviewElement=document.getElementById('image-preview');

function showPreview(){
  //files will store the files we get from filepickerElement.files 
  const files=filePickerElement.files;

  //checking if files are not present then do not show preview else show preview
  if( !files || files.length===0){
    imagePreviewElement.style.display="none";
    return;
  }else{
    const pickedFile=files[0];
    //This url which we are creating with the help of URL.createObjectURL(pickedFile)
    //will point to the user's computer where image is stored
    imagePreviewElement.src=URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display="block";
  }

}

//change event is emitted whenever the value you picked in this input will change
//i.e when you upload a new file or change the files
filePickerElement.addEventListener("change", showPreview);