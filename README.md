# Easy-API
## 开箱即用的多功能后端程序，基于[vio](https://github.com/vilic/vio)
特点：
- 基于请求URL和文件目录、函数名自动找到合适的处理函数，不需修改其他文件；  
- 动态加载已更改的文件，不需要重启服务；  
- 功能强大，支持模版渲染、WebSocket、用户管理与鉴权等各种功能、

## 使用
1. 下载文件  
    ```
    git clone https://github.com/Starrah/easy-api.git
    ```
2. 运行程序  
    命令行可以带参数指定端口号，不填则默认为8080
    ```
    node app.js 8080
    ```
3. 放置你的API
    使用`vio`的`Controller`语法编写处理请求的程序，然后直接放到api文件夹下即可。放置的位置就是请求的URL。
    您下载的文件中api文件夹内已有一定量的示例函数，您可仿照此编写。
    
## 探索更多
   首先，我向您推荐[我的介绍vio和easy-api的专题博客](https://starrah.cn/blog/vio%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8%E4%B8%8Eeasy-api-20191230/)，里面有关于vio的用法的大量叙述，并结合许多示例代码供参考；
   其次，您可以查看[vio的文档](https://github.com/vilic/vio#readme)和[vio的官方demo](https://github.com/vilic/vio-demos)，尤其是[官方demo](https://github.com/vilic/vio-demos)，很容易仿照使用。
   最后，本代码库的代码中有充分的注释，您下载后阅读代码和注释也是不错的选择。
   
## 授权
   使用MIT license授权。
   欢迎用于各种用途，和进行二次开发，请注明出处即可（附上本代码库名称和链接）。
   欢迎提issue、发pull request。
    
