// 前端逻辑
import PreviewImg from "./PreviewImg.js";
import { upload } from "./upload.js";

const imgFile = document.querySelector(".imgFile");
const imgFileAdd = document.querySelector(".imgFile-add");
const showContainer = document.querySelector(".showContainer");
const loadContainer = document.querySelector(".loadContainer");
const uploadBtn = document.querySelector(".uploadBtn");

// 每次刷新页面就展示所有图片
getAllImg()

let uploadImgList = [];
uploadBtn.addEventListener("click", async () => {
  // 上传图片到服务器
  for (const previewImg of uploadImgList) {
    await upload(previewImg);
  }
  // 上传完成了
  uploadCompleted();
});

function uploadCompleted() {
  alert('上传成功！')
  reset();
  getAllImg();
}

function reset() {
  hideLoadContainer();
  uploadImgList = [];
  document.querySelector(".wantUpload").innerHTML = ``;
  document.querySelector(".masking").style.display = "none";
}

function showAllImg(xhr) {
  let arr = xhr.response;
  arr = JSON.parse(arr)
  const photoContainer =  document.querySelector('.photoContainer')
  photoContainer.innerHTML = ''
  arr.forEach((img) => {
    const imgHtml = `
    <div class="photoItem">
    <img src="${img.url}">
    <span>${img.name}</span>
    </div>`;
    const item = document.createElement('div')
    item.innerHTML = imgHtml
    photoContainer.appendChild(item)
  });
}

function getAllImg() { 
  const xhr = new XMLHttpRequest();
  xhr.open("get", "/getPhotos");
  xhr.send();
  xhr.onload = () => {
    showAllImg(xhr);
  };
}

imgFileAdd.addEventListener("change", (e) => {
  renderPreviewImg(e.target.files);
});

imgFile.addEventListener("change", (e) => {
  renderPreviewImg(e.target.files);
});

function renderPreviewImg(files) {
  const fileList = Array.from(files);

  fileList.forEach((file) => {
    const previewImg = new PreviewImg(file);
    uploadImgList.push(previewImg);
  });

  showLoadContainer();
}

function showLoadContainer() {
  showContainer.style.display = "none";
  loadContainer.style.display = "block";
}

function hideLoadContainer() {
  showContainer.style.display = "block";
  loadContainer.style.display = "none";
}
