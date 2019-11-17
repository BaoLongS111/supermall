import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    //免费的接口
    // baseURL:'http://123.207.32.32:8000/detail/1m70y5k',
    // baseURL : "http://123.207.32.32:8000/api/vip/detail/1m70y5k",
    baseURL: "http://106.54.54.237:8000/api/v1",
    timeout:5000
  })

  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    // console.log(error);
  })

  //2.2响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  }, error => {
    console.log(error);
  })

  //3发送真正的网络请求
  return instance(config)
  //返回的promise类型
}

