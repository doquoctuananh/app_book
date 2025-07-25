const isEmmpty= (value) => {
    return value == "" ? "Không được để trống" : true
}

const isValidatePhone = (value) => {
    let regexPhone = /^0\d{9}$/;
    return regexPhone.test(value) ? true : "Gồm 10 số không có chữ cái"
}

const ValidateLogin = (login) => {
    let error = {};
    Object.keys(login).forEach((cur,index) => {
        if(isEmmpty(login[cur]) != true){
            error[cur] = isEmmpty(login[cur])
        }
    })
    return error
}

const isValidateInforOrder = (inforOrder) => {
    let error= {};
    Object.keys(inforOrder).forEach((cur,index) => {
        if(cur!== "phone"){
            if(isEmmpty(inforOrder[cur]) !== true){
                error[cur] = isEmmpty(inforOrder[cur])
            }
        }
        else{
            if(isValidatePhone(inforOrder[cur] ) !== true){
                error[cur] = isValidatePhone(inforOrder[cur])
            }
        }
    })
    return error;
}

export {ValidateLogin,isValidateInforOrder}