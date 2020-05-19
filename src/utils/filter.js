import Vue from 'vue'
Vue.filter("playnum", data => {
    data = data.toString();
    if (data.length > 8) {
      return (data / 100000000).toFixed(1) + "亿";
    }
    if (data.length > 4) {
      return (data / 10000).toFixed(1) + "万";
    }
    return data;
  });
Vue.filter('singers',data=>{
    let list = []
    data = data.forEach(({name}) =>{
        list.push(name)
    })
    return list.join('/')
})
Vue.filter('numberCode',data=>{
    data = data*1 +1;
    if(data < 10){
        return "0" + data
    }
    return data
})