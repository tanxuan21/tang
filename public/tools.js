// const fs = require('fs');
// const path = require('path');
import fs from 'fs';
import path from 'path'
function getFileNames(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                // const fileNames = files.map(file => path.join(folderPath, file));
                // resolve(fileNames);
                resolve(files)
            }
        });
    });
}

// 使用示例
getFileNames('./obj')
    .then(fileNames => {
        // 将数组转换为JSON字符串
        const jsonString = JSON.stringify(fileNames);

        // 将JSON字符串写入文件
        fs.writeFile('objFileName.json', jsonString, (err) => {
            if (err) {
                console.error('写入文件时发生错误：', err);
            } else {
                console.log('数组已成功保存为JSON文件');
            }
        });

    })
    .catch(err => console.error(err));




