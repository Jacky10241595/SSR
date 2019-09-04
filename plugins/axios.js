// 使用axios的拦截器拦截页面的所有错误请求,并弹出对应的提示
import {Message} from 'element-ui';
export default function({$axios,redirect}){
   $axios.onError(err=>{
       const{statusCode,message}=err.response.data;
       if(statusCode===400){
           Message.warning({message});
       }
   }) 
}