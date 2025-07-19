const isEmmpty= (value) => {
    return value == "" ? "Không được để trống" : true
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

export {ValidateLogin}