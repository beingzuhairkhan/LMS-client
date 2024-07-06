import {useSelector} from 'react-redux'
import React from 'react';

const userAuth = ()=>{
    const {user} = useSelector((state:any)=> state.auth);
    if(user){
        return true
    }else{
        return false ;
    }
}

export default userAuth