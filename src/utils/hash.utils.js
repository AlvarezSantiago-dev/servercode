import {compareSync, hashSync, genSaltSync} from 'bcrypt'

const createHash = (password) =>{
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt)
    return hash
}
const verifyHash = (reqBodypass, mongoPass) =>{
    const verify = compareSync(reqBodypass, mongoPass);
    return verify
}
export {createHash, verifyHash};

