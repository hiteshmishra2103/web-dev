const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("image-preview");


function showPreview(event) {
  //filerPickerElement.files will give us access to the selected files to the file
  //picker element
  const files = filePickerElement.files;
  //to check if any file has been selected if no file has been selected then
  //image preview will not be shown
  if (!files || files.length === 0) {
    //if no file is selected then hide the imagePreviewElement
    imagePreviewElement.style.display = "none";
    return;
  }
  //We will only select the one file because post-thumbnail cannot be more than one
  const pickedFile = files[0];

  //URL.createObjectURL will take a file as an argument and convert a URL that
  //can be used as an image source
  //👇below it will create an URL to that user picked file.
  //This only creates a local URL which only works on the computer of the user who
  //uploaded that file, ⭐it is not present in our database
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
}

//Change event is emitted whenever the value in the filerPickerElement changes,
// such as when you upload another file after a file already has been uploaded
filePickerElement.addEventListener("change", showPreview);
