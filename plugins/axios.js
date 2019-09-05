// 使用axios的拦截器拦截页面的所有错误请求,并弹出对应的提示
import {Message} from 'element-ui';
export default function({$axios,redirect}){
    // onError用于错误拦截
   $axios.onError(err=>{
    //    返回的err是一个错误对象,Error对象下都有一个response的属性可以访问错误的信息
    //    解构出错误信息和代码
       const{statusCode,message}=err.response.data;
       if(statusCode===400){
           Message.warning({message});
       }
   }) 
}