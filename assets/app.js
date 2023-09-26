const http = require("http");
const url = require("url");
const fs = require("fs");
// const path = require('path');
const template = require("art-template");


let comments = [
    {
        name: "Joanna",
        content: "飛向宇宙～",
        time: "2022-2-16 20:20:00" 
    },
    {
        name: "David",
        content: "浩瀚無敵～",
        time: "2022-2-17 21:45:00" 
    },
];



http.createServer((request, response)=> {
    /* 
        (1) 解析路徑，讀取對應資料 / template.render(source, data, options);
        (2) 如果 讀取對應資料 失敗，要怎麼處理: return 404 page
        (3) 結束
    */
    const resUrlData = url.parse(request.url, true);
    const pathName = resUrlData.pathname;

    // handle 404 page:
    function handleErrorPage(){
        fs.readFile("./views/404.html", (err, data) => {
            if(err) return response.end("404 NOT FOUND!");

            response.end(data.toString());
        })
    }
    if(pathName.indexOf('/public') === 0){ // controller: handle public folder path 
        fs.readFile(`./${pathName}`, (err, data)=> {
            if(err) return handleErrorPage();
 
             response.end(data.toString());
        })
    }else if(pathName === '/'){ // handle view page
        const absoluteUrl = path.join(__dirname, '../views/index.html');
        fs.readFile(absoluteUrl, (err, data)=> {
            if(err) return handleErrorPage();
            
            const renderData = template.render(data.toString(), {comments: comments});
            response.end(renderData);
        })
    }else if(pathName === '/post'){
        const absoluteUrl = path.join(__dirname, '../views/post.html');
        fs.readFile(absoluteUrl, (err, data)=> {
            if(err) return handleErrorPage();

            response.end(data);
        })

    }else if(pathName === '/comment'){
        const commentData = resUrlData.query;
        commentData.time = new Date().toLocaleString();

        comments = [commentData, ...comments];

        response.statusCode = 302; // redirect url (post.html -> index.html)

        response.setHeader('Location', '/');
        response.end();
    }
   
}).listen(5000, ()=> {
    console.log("Sever is running....")
})
