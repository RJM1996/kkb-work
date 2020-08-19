const Koa = require("koa");
const mysql = require("mysql2/promise");
const Router = require("koa-router");
const koaBody = require("koa-body");
const router = new Router();

const app = new Koa();
// mysql
(async function () {
  const mysqler = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "work",
  });
  //   const table = 'user' // 設置表名

  const getData = async () => {
    const sql = `SELECT * FROM user`;
    const [rows] = await mysqler.execute(sql);
    if (rows) {
      return rows;
    } else {
      return "add fail";
    }
  };

  router.get("/addUser", async (ctx) => {
    const { username, age } = ctx.query;
    const sql = `INSERT INTO user (id,age,name) VALUES (0,?,?)`;
    const [rows] = await mysqler.execute(sql, [age, username]);
    if (rows.affectedRows) {
      const data = await getData();
      ctx.body = data;
    } else {
      ctx.body = "add Fail";
    }
  });

  router.get("/getData", async (ctx) => {
    const sql = `SELECT * FROM user`;
    const [rows] = await mysqler.execute(sql);
    if (rows) {
      ctx.body = rows;
    } else {
      ctx.body = "get Fail";
    }
  });
})();

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
