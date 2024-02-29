//import CheckBox from "./CheckBox";
const test = () => {
    let formData = new FormData(); 
    formData.append('name', "Sheng_Shun_Chang");
    formData.append('prefered_time', "midnight");
    formData.append('bio', "love Amazing Show");
    formData.append('photo', "Some random URL");
    formData.append('ig', "vitolin_yucheng");
    formData.append('fb', 'Kent_l');
    formData.append('email', 'vitolin0416@gmail.com');
    formData.append('instrument', 'violin');
    formData.append('region', 'Taipei');
    formData.append('style', 'rock paper scissor');

    function validateFile() {
        const fileInput = document.getElementById("fileInput");
        const fileNameDisplay = document.getElementById("fileName");
        const fileSizeError = document.getElementById("fileSizeError");

        if (fileInput.files.length > 0) {
            const fileSize = fileInput.files[0].size; // Size in bytes
            const maxSizeInBytes = 1024 * 1024; // 1 MB

            if (fileSize > maxSizeInBytes) {
                fileSizeError.textContent = "File size exceeds the allowed limit (1 MB).";
                fileInput.value = ""; // Clear the file input
            } else {
                fileSizeError.textContent = "";
                fileNameDisplay.textContent = `Selected File: ${fileInput.files[0].name}`;
            }
        } else {
            fileSizeError.textContent = "";
            fileNameDisplay.textContent = "No file selected";
        }
    }
    
  return(
    <div class="upload-container">
        <label for="fileInput" class="custom-upload-btn">Choose a Photo</label>
        <input type="file" id="fileInput" accept="image/*" onchange="validateFile()" />
        <div id="fileName"></div>
        <div id="fileSizeError"></div>
    </div>

    
  )
}
export default test;