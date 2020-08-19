const Koa = require("koa");

const Router = require("koa-router");

const serve = require("koa-static");

const views = require("koa-views");

const koaBody = require("koa-body");

const fs = require("fs");
const path = require('path')

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use(
  views(__dirname + "/views", {
    extension: "html",
  })
);

app.use(
  koaBody({
    multipart: true,
  })
);

// 保存图片
function saveImg(img, imgName) {
  try {
    const readStream = fs.createReadStream(img.path);
    const uploadPath = path.resolve(__dirname, "./static/upload", imgName);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);
    return 1
  } catch (error) {
    console.log(error)
    return -1
  }
}

const router = new Router();
router.get("/", (ctx) => {
  const index = fs.readFileSync("./static/index.html");
  ctx.res.end(index);
});
router.post("/upload", (ctx) => {
  const { img } = ctx.request.files;
  const result = saveImg(img, img.name)
  if(result != -1) {
    ctx.body = "上传成功";
  }
  ctx.body = "上传出错"
});
app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
