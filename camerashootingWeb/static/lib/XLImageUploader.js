class XLImageUploader {

    /**
     * 构造方法
     * @param {Object} config 
     */
    constructor(config = {}) {
        this.bucket = config.bucket ? config.bucket : 'xlfile-1256392453';
        this.region = config.region ? config.region : 'ap-chengdu';
        this.protocol = location.protocol === 'https:' ? 'https:' : 'http:';
        this.cosPrefix = this.protocol + '//' + this.bucket + '.cos.' + this.region + '.myqcloud.com';
        this.returnval = config.returnval ? config.returnval : "http://localhost:5080/|1|1|xlhl|http://localhost:5819/|http://171.211.126.122:8092/|3,1|3,1|http://localhost:8088";//请求头 
        this.prefix = "/" + (config.prefix ? config.prefix : '');
        this.txsing = "";
    }

    /**
     * 获取文件后缀名
     * @param {String} filename 
     */
    getSuffix(filename) {
        return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    }

    /**
     * 生成唯一id
     */
    newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }

    /**
     * 获取签名
     * @param {*} key 
     * @param {*} strModel 
     */
    gettxkey(key, strModel) {
        var txkey = '';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    this.txsing = eval(xhr.responseText);
                    txkey = eval(xhr.responseText);
                }
            }
        }
        xhr.open('get', "https://xilai99.com/xlapi/Login/Login/User/gettxkey?strModel=" + strModel + "&pathname=" + key + "&qheaderlist=&qurlparamlist=&strtime=", false); //同步请求
        xhr.setRequestHeader('Authorization', this.returnval);
        xhr.send();
        return txkey;
    }

    /**
     * 上传文件
     * @param {*} file 文件
     * @param {*} key 
     * @param {Boolean} loadingBar 是否显示正在上传加载bar
     */
    upFile({ file, key, loadingBar = true, callback = () => { }, onProgress = () => { }, onError = () => { } }) {
        let up = {};
        // 如果key存在，则用key直接上传，不然就取新的
        up.guid = key ? undefined : this.newGuid();
        up.fileName = file.name;
        up.suffix = this.getSuffix(up.fileName);
        up.key = key ? key : (this.prefix + '/' + up.guid + "." + up.suffix);
        up.url = this.cosPrefix + up.key;
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', up.url, true);
        xhr.setRequestHeader('Authorization', this.gettxkey(up.key, "PUT"));
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 206) {
                callback(up)
            } else {
                onError('错误码：' + xhr.status);
            }
            window.xl_uploader_current_count--;
            if (window.xl_uploader_current_count == 0) {
                this.hideLoadingBar();
            }
        };
        if (window.xl_uploader_current_count) {
            window.xl_uploader_current_count++;
        } else {
            window.xl_uploader_current_count = 1;
        }
        if (loadingBar) {
            this.showLoadingBar();
        }
        xhr.upload.onprogress = onProgress;
        xhr.onerror = () => {
            onError('请检查是否没配置 CORS 跨域规则') 
        };
        xhr.send(file);
    }

    /**
     * 显示上传加载中
     */
    showLoadingBar() {
        let bar = document.getElementById("xl_uploader_loading_bar");      
        if (bar) {
            bar.style.display = "block";
        } else {
            bar = document.createElement("div");
            bar.style = "position: fixed; padding: 0 20px 20px;left: 50%; top: 50%; z-index: 100;display:block;width:220px;height:91px;background:white;margin-left:-130px;margin-top:-45px;box-shadow: 0 0px 9px #80808070;";
            bar.innerHTML = `<img src="https://xilai99.com/image/loading.gif"/>`
            bar.id = "xl_uploader_loading_bar";
            document.body.appendChild(bar);
        }
    }

    /**
     * 隐藏上传加载中
     */
    hideLoadingBar() {
        let bar = document.getElementById("xl_uploader_loading_bar");
        if (bar) {
            bar.style.display = "none";
        }
    }

    /**
     * 上传图片
     * @param {*} file 
     * @param {*} ys 0:只传原图 1：只传压缩图 2：传原图和压缩图
     * @param {*} oWidth 
     * @param {*} oHeight 
     */
    upImg({ file, ys = 0, oWidth = 800, oHeight = 600, loadingBar, callback = () => { }, onProgress = () => { }, onError = () => { } }) {
        let fileName = file.name;
        let suffix = this.getSuffix(fileName);
        if ("bmp,jpg,png,tiff,gif,jpeg,mp4,mov,m4v".indexOf(suffix.toLowerCase()) == -1 && !this.isVideo) {
            alert("选择的文件不是图片格式");
            return;
        }

        if (ys == 1) {
            lrz(file, {
                width: oWidth,
                height: oHeight,
                quality: 0.95 //图片质量
            }).then(rst => {
                this.upFile({
                    file: this.dataURLtoBlob(rst.base64, fileName),
                    callback: data => callback(data),
                    loadingBar,
                    onProgress: onProgress,
                    onError: msg => {
                        onError("文件：" + fileName + "上传失败 " + msg)
                    }
                });
            });
        }
        else if (ys == 3) {
            lrz(file, {
                quality: 0.9 //图片质量
            }).then(rst => {
                this.upFile({
                    file: this.dataURLtoBlob(rst.base64, fileName),
                    key: this.prefix + '/' + this.newGuid() + '-ys.' + this.getSuffix(fileName),
                    callback: data => callback(data),
                    loadingBar,
                    onProgress: onProgress,
                    onError: msg => {
                        onError("文件：" + fileName + "上传失败 " + msg)
                    }
                });
            });
        }
        else{
            this.upFile({
                file: file,
                callback: data => {
                    if (ys == 2) {
                        lrz(file, {
                            width: oWidth,
                            height: oHeight,
                            quality: 0.95 //图片质量
                        }).then(rst => {
                            this.upFile({
                                file: this.dataURLtoBlob(rst.base64, fileName),
                                key: this.prefix + '/' + data.guid + "-ys." + data.suffix,
                                onProgress: onProgress,
                                loadingBar,
                                onError: msg => {
                                    onError("文件：" + fileName + "上传失败 " + msg)
                                },
                                callback: data1 => callback(Object.assign(data, {
                                    ysKey: data1.key,
                                    ysUrl: data1.url,
                                    ys: ys
                                }))
                            })
                        });
                    } else {
                        callback(data)
                    }
                },
                loadingBar,
                onProgress: ys == 2 ? undefined : onProgress, //如果原图和缩略图都传，只取缩略图的进度
                onError: msg => {
                    onError("文件：" + fileName + "上传失败 " + msg)
                }
            });
        }
    }

    /**
     * 将base64字符串转换为二进制
     * @param {String} dataurl 
     * @param {String} name 文件名 
     */
    dataURLtoBlob(dataurl, name) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], { type: mime });
        blob.name = name;
        return blob;
    }

    /**
     * 按照key删除指定的文件
     * @param {String} key 
     * @param {Function} callback 
     */
    delObject({ key, url, callback = () => { } }) {
        if (!key && !url) {
            throw new Error("key、url必须传一个")
        }
        key = key ? key.split("?")[0] : url.split("?")[0].split('com')[1]
        let reqUrl = this.cosPrefix + key;
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', reqUrl, true);
        xhr.setRequestHeader('Authorization', this.gettxkey(key, "DELETE"));
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 204) {
                callback(1001)
            } else {
                callback(1002)
            }
        }
        xhr.send()
    }

    /**
     * 选择文件弹出框 可指定是否多选,上传完后返回文件列表(upImg或upFile的返回)
     * type = file或者img, 当为img时，ys oWidth oHeight 才有效
     * 
     */
    chooseFiles({ type = 'file', ys, oWidth, oHeight, multiple = true, fileType} = {}) {
        if(!fileType) fileType = 'file'
        if (!Vue || !layer) {
            throw new Error('需要引入Vue和layer')
        }
        let uploader = this;
        return new Promise((resolve, reject) => {
            let style = document.createElement('style')
            style.innerText = '.xlfuc-img-file-pane {width: 70%;margin: 12px auto;box-shadow: 0 0 4px #8080809e;padding: 12px;background: #F6F6F6;}.xlfuc-img-file-pane:hover {box-shadow: 0 0 8px #808080d8;transition: .3s;}.xlfuc-close-btn {float: right;cursor: pointer;}.xlfuc-close-btn:hover {color: orangered;}.xlfuc-progress-wrap {margin-top: 5px;background-color: lightgray;width: 100%;height: 8px;border-radius: 8px;}.xlfuc-progress-bar {width:0;height: 8px;border-radius: 8px;background-color: green;}.xlfuc-progress-btn {padding: 5px 10px}.xlfuc-file-name {width: 90%;overflow: hidden;display: inline-block;text-overflow: ellipsis;}'
            document.querySelector('body').appendChild(style)
            let index = layer.open({
                type: 1,
                title: `${type == 'file' ? '文件' : '图片'}上传(${multiple ? '多选' : '单选'})`,
                shadeClose: false,
                area: ["600px", "400px"],
                zIndex: 19999999,
                content: `
                    <div id="xl_file_upload_chooser">
                        <div style="text-align: center;margin-top: 16px;">
                            <div style="text-align: center; margin: 20px;">
                                <span style="cursor: pointer;color: #BB9860; font-size: 15px;" @click="$refs.imageInput.click()">[选择${type == 'file' ? '文件' : '图片'}]</span>
                            </div>
                            <div v-for="file in files" class="xlfuc-img-file-pane">
                                <div>
                                    <span class="xlfuc-file-name" :title="file.name">{{file.name}}</span>
                                    <span class="xlfuc-close-btn" @click="files.remove(file)">✖</span>
                                </div>
                                <div v-if="file.progress < 100" class="xlfuc-progress-wrap">
                                    <div class="xlfuc-progress-bar" :style="'width:' + file.progress + '%'"></div>
                                </div>
                            </div>
                            <div style="margin: 40px 0;" v-if="files.length>0">
                                <button class="xlfuc-progress-btn" style="margin-right: 20px" @click="cancel">取消</button>
                                <button class="xlfuc-progress-btn" @click="onOk">确定</button>
                            </div>
                        </div>
                        <input type="file" ref="imageInput" hidden @change="chooseFile" ${multiple ? 'multiple' : ''}>
                    </div>
                `
            })
            new Vue({
                el: '#xl_file_upload_chooser',
                data: {
                    files: [],
                    completeCount: 0
                },
                methods: {
                    chooseFile() {
                        let list = this.$refs.imageInput.files;
                        if (list.length > 0) {
                            for (let i = 0; i < list.length; i++) {
                                if (!multiple) {
                                    this.files = []
                                }
                                this.files.push({
                                    file: list[i],
                                    name: list[i].name,
                                    progress: 0
                                });
                            }
                        }
                        // 重置input
                        this.$refs.imageInput.value = null
                    },
                    onOk() {
                        this.files.forEach(f => {
                            if (type == 'file') {
                                if(fileType == "video"){
                                    if(f.name.indexOf(".mp4")==-1){
                                        alert("选择的文件不是视频格式");
                                        return;
                                    }
                                }
                                uploader.upFile({
                                    file: f.file, callback: res => {
                                        this.completeCount++
                                        Object.assign(f, res)
                                        if (this.completeCount === this.files.length) {
                                            layer.close(index)
                                            resolve(this.files)
                                        }
                                    },
                                    onProgress: e => f.progress = Math.round(e.loaded / e.total * 100),
                                    onError: msg => {
                                        layer.close(index)
                                        reject(msg)
                                    }
                                })
                            } else {
                                uploader.upImg({
                                    file: f.file, ys, oWidth, oHeight, callback: res => {
                                        this.completeCount++
                                        Object.assign(f, res)
                                        if (this.completeCount === this.files.length) {
                                            layer.close(index)
                                            resolve(this.files)
                                        }
                                    },
                                    onProgress: e => f.progress = Math.round(e.loaded / e.total * 100),
                                    onError: msg => {
                                        layer.close(index)
                                        reject(msg)
                                    }
                                })
                            }
                        })
                    },
                    cancel() {
                        layer.close(index)
                    }
                }
            })
        })
    }
    /**
* 复制腾讯云文件到新路径
* @param {String} key
* @param {Function} callback 
*/
    CopyObject({ path, key, url, callback = () => { } }) {
        if (!key && !url) {
            throw new Error("key、url必须传一个")
        }
        var rkey = path.split('com')[1]
        let reqUrl = key ? key.split("?")[0] : url.split("?")[0].split('com')[1];
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', path, true);
        xhr.setRequestHeader('Authorization', this.gettxkey(rkey, "PUT"));
        xhr.setRequestHeader('x-cos-copy-source', this.bucket + '.cos.' + this.region + '.myqcloud.com' + reqUrl);//源文件 URL 路径
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 204) {
                callback(1001)
            } else {
                callback(1002)
            }
        }
        xhr.send()
    }
    /**
     * 下载文件
     * @param {*} param0 
     */
    download({ key, url, fileName, callback = () => { }, onProgress }) {
        if (!key && !url) { 
            throw new Error('key或url必传')
        }
        if (key) {
            url = this.cosPrefix + key
        }
        // 如果没有传onProgress, 就用默认的defaultDownloadProgress, 需要先打开弹出框
        if (onProgress) {
            download(url, fileName, onProgress)
        } else {
            if (layer) {
                window.xl_download_progress_layer = layer.open({
                    title: `<a style='font-size:15px;'>正在下载</span></a>`,
                    type: 1,
                    area: ['300px', '120px'],
                    fixed: false, //不固定
                    maxmin: false,
                    zIndex: 1000,
                    shade: .3,
                    content: `
                        <div style="height:100%;text-align:center;display:flex;padding: 0 20px;">
                            <div id="xl_download_progress" style="background-color: lightgray;width: 100%;height: 8px;border-radius: 8px;margin: auto 0;">
                                <div id="xl_download_progressbar" style="width:0;height: 8px;border-radius: 8px;background-color: green;" ></div>
                            </div>
                            <div id="xl_download_progress_success" style="display:none;margin:auto;">下载完成</div>
                        </div>
                    `
                })
            } else {
                throw new Error('需要引入layer')
            }
            download(url, fileName, this.defaultDownloadProgress)
        }
    }

    defaultDownloadProgress(e) {
        let bar = document.getElementById('xl_download_progressbar')
        if (bar) {
            bar.style.width = (e.loaded / e.total * 100) + '%'
            if (e.loaded == e.total) {
                document.getElementById('xl_download_progress').style.display = 'none'
                document.getElementById('xl_download_progress_success').style.display = 'block'
                // 1秒自动关闭
                setTimeout(() => {
                    layer.close(window.xl_download_progress_layer)
                }, 1000)
            }
        }
    }

}

function getBlob(url, onProgress) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        //监听进度事件
        xhr.addEventListener("progress", onProgress, false);

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
}

/**
* 保存
    * @param  {Blob} blob
    * @param  {String} filename 想要保存的文件名称
*/
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
}

/**
* 下载
    * @param  {String} url 目标文件地址
    * @param  {String} filename 想要保存的文件名称
    * @param  {Function} onProgress 进度事件
*/
function download(url, filename, onProgress) {
    getBlob(url, onProgress).then(blob => {
        saveAs(blob, filename);
    });
}
