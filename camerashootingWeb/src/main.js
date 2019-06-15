import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import VuePreview from 'vue2-preview'       //图片预览


Vue.use(ElementUI);
Vue.use(VuePreview)



// Axios.defaults.baseURL = 'https://xilai99.com/';
Axios.defaults.baseURL = 'http://192.168.1.253:8092';
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$Axios = request;//封装axios请求
Vue.prototype.sessionStorageLose = sessionStorageLose;//登录计时
Vue.prototype.$ThisParent = ThisParent;         //寻找父级变量
Vue.prototype.$ImgFileBase64 = ImgFileBase64;     //图片转base64
Vue.prototype.$UpImgFile = UpImgFile;           //上传图片
Vue.prototype.$tips = tips;                       //成功提示
Vue.prototype.$warning = warning;                //警告
Vue.prototype.$DetelImg = DetelImg;             //删除图片



/**
 * 成功提示
 * @method tips
 * @for tips
 * @param {String}
 * */
function tips(msg) {
  this.$message({
    message: msg,
    type: 'success'
  });
}
/**
 * 失败提示
 * @method tips
 * @for tips
 * @param {String}
 * */
function warning(msg) {
  this.$message({
    message: msg,
    type: 'warning'
  });
}

/**
 * 寻找父级变量 并修改
 * @method ThisParent
 * @for ThisParent
 * @param {Object}
 * @return {callblck} 方法回调
 * */
function ThisParent(data) {
  let that = this;
  let parent = this.$parent;
  function f(t) {
    let arr = Object.keys(t.$data);
    if(arr.indexOf(data.variable) == -1){
      parent = parent.$parent
      f(parent)
    }else{
      data.callblack.call(that,parent)
    }
  }
  f(parent)
}
/**
 * 文件转base64
 * @method ImgFileBase64
 * @for ImgFileBase64
 * @param {Array}
 * @return {callblck} 方法回调
 */
function ImgFileBase64(param) {

  let that = this;

  param.list.forEach((res)=>{

    var reader = new FileReader();

    reader.readAsDataURL(res);

    reader.onload = function (e){

      param.callback.call(that,reader.result)

    }

  })
}

/**
 * 图片及文件上传
 * @method UpImgFile
 * @for UpImgFile
 * @param {Object}
 * @return {callblck} 方法回调
 */
function UpImgFile(param) {

  if(typeof param != "object"){
    return
  }

  let arr = new Array;

  let uploader = new XLImageUploader({ prefix: param.path });

  let that = this


  for(let i = 0; i < param.file.length;i++){
    arr.push(param.file[i])
  }

  //上传
  arr.forEach((res,i)=>{
    uploader.upImg({
      ys:2,
      file: res,
      callback:function (res) {
        console.log(res)
        GetHash(res.url).then(hash => {
          param.callback.call(that,res)
        })
      }
    });
  })
}

/**
 * 图片及文件删除
 * @method DetelImg
 * @for DetelImg
 * @param {Object}
 * @return {callblck} 方法回调
 */

let i = 0;
function DetelImg(param) {

  if(typeof param != 'object'){
    throw '该参数不是一个对象!'
    return
  }

  let uploader = new XLImageUploader();

  let that = this;

  let arr = new Array();

  //单个文件
  if(typeof param.file == 'string'){

    arr.push(param.file)

  }

  //多个文件删除
  if(typeof param.file == 'object' && param.file.length > 0){

      arr = param.file.map(res => res)

  }

  //批量删除
  arr.forEach((r)=>{
    uploader.delObject({
      key:r.key,
      callback: res => {
        if(res == 1001){
            //单个删除成功 方法回调
            i++
            param.callback.call(that,r)
            //全部删除回调
            if(i == arr.length){
              i = 0
              param.callbackall && param.callbackall.call(that,arguments)
            }
        }else{
          param.callback.call(that,r)
          throw '删除失败!'
        }
      }
    })
  })
}

/**
 * 获取hash值
 * @method GetHashv
 * @for GetHash
 * @param {string}
 */
function GetHash(url) {
  return new Promise((resolve, reject) => {
    $.get( "https://xilai99.com/showproject/image.py?path="+url, res =>resolve(res))
  })
}


//注册全局组件:
import dropSelect2 from './components/calendar/dropSelect2';
import dropSelect1 from './components/common/dropSelect/dropSelect';
import Input from './components/common/Input/Input';
import textArea from './components/common/textArea/textArea';
import inputSearch from './components/common/inputSearch/inputSearch';
import inputSearch2 from './components/common/inputSearch2/inputSearch2';
import timeSelect1 from './components/common/timeSelect1/timeSelect1';
Vue.component('dropSelect2', dropSelect2);//两个
Vue.component('dropSelect1', dropSelect1);//一个
Vue.component('commonInput', Input);
Vue.component('textArea', textArea);
Vue.component('inputSearch', inputSearch);
Vue.component('inputSearch2', inputSearch2);
Vue.component('timeSelect1', timeSelect1);


//自定义指令1
Vue.directive('marginRight', {
  bind(el, binding) {
    el.style.marginRight = parseInt(binding.value) + 'px'
  }
});
//自定义指令2
Vue.directive('myHeight', {
  bind(el, binding) {
    el.style.height = parseInt(binding.value) + 'px'
  }
});
//自定义指令3
Vue.directive('focus', {
  inserted(el,) {
    el.focus();
  }
});

//全局前置导航守卫
router.beforeEach((to, from, next) => { //全局前置守卫按照创建顺序调用
  if (to.path == '/login') {
    next();
  } else {
    if (sessionStorage.getItem('userInfo')) {
      next();
    } else {
      next({path: '/login'});
    }
  }
});

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',

});

/**
 *localStorage失效时间
 * @time 设置失效时间  单位 小时
 */
function sessionStorageLose(hour) {
  setTimeout(()=> {
    alert('登陆过期，请重新登陆');
    sessionStorage.removeItem('userInfo');
    vm.$router.push({path: '/login'});
  }, hour*3600000);
}

/**
 *封装axios
 * @param 传进的method、url、data等对象
 */
function request(param) {
  // sessionStorageLose(2);//判断是否登陆过期
  let _that = this;
  let method = param.method;
  let url = param.url;
  let dataObj = param.data;
  if (method == 'GET' || method == 'get') {
    let dataObjArr = [];
    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key)) {
        dataObjArr.push(key);
        if (dataObjArr.length == 1) {
          url = url + '?' + key + '=' + dataObj[key];
        } else {
          url = url + '&' + key + '=' + dataObj[key];
        }
      }
    }
    this.$axios({
      method: method,
      url: url,
      headers: {
        Authorization: 'http://211.149.163.185:8090/|1|1|xlhl|http://171.211.126.122:8091/|http://171.211.126.122:8092/|1,1|http://192.168.1.253:8095|https://xilai99.com'
      }
    }).then(res => {
      param.success.call(_that,res);
    }).catch(err => {
      param.error.call(_that,err);
    });
  } else if (method == 'POST') {
    this.$axios({
      method: method,
      url: url,
      data: dataObj,
      headers: {
        Authorization: 'http://211.149.163.185:8090/|1|1|xlhl|http://171.211.126.122:8091/|http://171.211.126.122:8092/|1,1|http://192.168.1.253:8095|https://xilai99.com'
      }
    }).then(res => {
      param.success.call(_that,res);
    }).catch(err => {
      param.error.call(_that,err);
    });
  }
}

/*封装请求调用方式*/
// this.$Axios({
//   method:'POST',
//   url:url,
//   data:data,
//   success(res){
//     console.log(res)
//   },
//   // error(err){
//   //   console.log(err)
//   // }
// });*/







