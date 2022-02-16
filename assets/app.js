const http = require("http");
const url = require("url");
const fs = require("fs");


http.createServer((request, response)=> {
    console.log("response.url; ", response.url)
    const resUrlData = url.parse(response.url, true);
    const pathName = resUrlData.pathname;

    // handle 404 page:
    function handleErrorPage(){
        fs.readFile("../views/404.html", (err, data) => {
            if(err) return response.end("404 NOT FOUND!");

            res.end(data.toString());
        })
    }

    // handle static page:
    /* 
        (1) 解析路徑，讀取對應資料
        (2) 如果 讀取對應資料 失敗，要怎麼處理: return 404 page
        (3) 結束

    */
   if(pathName.includes("/public/")){     // handle frontEnd page
        fs.readFile(`../public/${pathName}.html`, (err, data)=> {
            if(err) return handleErrorPage();

            res.end(data.toString());
        })
   }else if(pathName === "/"){            // handle BackEnd page
        fs.readFile('../views/index.html', (err, data)=> {
            if(err) return handleErrorPage();

            res.end(data.toString());
        })
   }


})