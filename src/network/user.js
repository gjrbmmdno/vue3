import {request} from './request';

export function register(data){
  return request({
    url:"/api/auth/register",
    method:"post",
    data:data,
    
  })
}

export function login(data){
  return request({
    url:"/api/auth/login",
    method:"post",
    data:data,
    
  })
}

export function logout(data){
  return request({
    url:"/api/auth/logout",
    method:"post",
    
  })
}

export function getUsers(data){
  return request({
    url:"/api/user",
    method:"get",
    
  })
}