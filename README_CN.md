[English Readme](./README.md)

# EIS-module-starter-kit
本项目为EIS系统后端的初始化项目，建议所有其他EIS后端模块都基于本项目使用。

# 数据库
EIS期望可以使用任意数据库，但目前只实现了MongoDB数据库的模块化封装，因此在使用本项目之前，请确保您已经安装了MongoDB。

开发环境默认的数据库名称为`eis_db_dev1`，但此名称可以通过配置文件针对不同的运行环境进行修改。如需了解更多关于数据MongoDB数据库配置的信息，请访问[eis-module-mongodb](https://github.com/eisjs/eis-module-mongodb).

# 使用
1. 下载本项目[EIS backend starter kit](https://www.npmjs.com/package/eis-module-starter-kit).
2. 如需要添加任何模块，请在项目目录中运行类似命令`yarn add eis-module-xxx`'. 默认情况下[核心模块](https://github.com/eisjs/eis-module-core) 和[MongoDB模块](https://github.com/eisjs/eis-module-mongodb) 都已经添加.
3. 运行命令以安装依赖'`yarn install`'.
4. 运行项目'`yarn start`'.

# 试一试
1. 注意：当您多次重启服务时，可能会从终端看到如下错误信息，请打开MongoDB的终端，手动执行提示中的命令以创建索引，然后再尝试启动服务：
	> db.authors.createIndex({Name: 1}, {unique: true, sparse: false})
	> db.authors.createIndex({id: 1}, {unique: true, sparse: false})

    这些错误信息的出现是因为EIS默认不会自动创建所需要的索引信息，因为这在某些情况下会对系统带来风险，特别是生产环境。但您也可以通过修改配置文件允许EIS为某个特定环境自动添加必要的索引。
2. 从浏览器中，或任何可以发送API请求的工具中，尝试访问如下接口：
    - http://localhost:8000/api/demo
    - http://localhost:8000/api/demo/name
    - http://localhost:8000/api/demo/say
    - http://localhost:8000/api/demo/say/morning
    - http://localhost:8000/api/demo/bye
    - (POST) http://localhost:8000/api/demo/say/hello, 携带body信息： {Name: 'some name'}
    - http://localhost:8000/api/demo/say/hello/author

# 她是如何工作的
# 模块
# 生命周期和全局勾子
# 配置
# 测试
