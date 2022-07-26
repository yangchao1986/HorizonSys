import { JSEncrypt } from 'jsencrypt'
// 加密公钥
const key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsheS3+o4+RyWFmtZ56AQZAlH0
AQY93GnMqlvU2fNS4JIh49jRI3zrOXl+AbhHuZBatVOk/f9A5YeWQgRAyo5tF4HO
fpEJm05RuMMTSZ6uNQ3y8ah/JuE76k0gC98B06LgRI7bNUof/HVlDj3Vdsu4nO7L
fbcjIm0Y4HHkQfL08wIDAQAB`;
// 解密私钥
const privateKey = `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKyF5Lf6jj5HJYWa
1nnoBBkCUfQBBj3cacyqW9TZ81LgkiHj2NEjfOs5eX4BuEe5kFq1U6T9/0Dlh5ZC
BEDKjm0Xgc5+kQmbTlG4wxNJnq41DfLxqH8m4TvqTSAL3wHTouBEjts1Sh/8dWUO
PdV2y7ic7st9tyMibRjgceRB8vTzAgMBAAECgYEAkeCZV/OViRVxpboaNnQ32sm6
cD7Zfz87eqJmCeHMvDxFdECLmbOPMfqkPybHImbGp9yBAJcA2Wf7sNLbc8mSiUk5
2tyWLMvg7z5Rtn7zvL9druG8bOAw1WmuC4Fw2R9nJeAssOcLJT8UrBBGwO6Z3No1
Lccf5PrGUWNJQHseX8ECQQDlgf9WyVknAplOY2D8mz4+n5mtsBFHQo6T1+tJ2rnH
/T9HjaHaPzg2tO3NIPmf8IlKFQOb20CDQdi8pS9niniTAkEAwG/76wpLTlPrdRBg
lt82DephrQ/x+Hv9XLmB30DKyBB3k3ALngl+uW52CiOocGIa+TzkQnVG4TcamiJ1
SzUuIQJBALF3F+4Pu3RCujC2/6PUlwjteHOplXK4sG75ouJ00vslg+zcQ67y+5Cx
zr+zI9LcuAwku6mkm/nizKjyQfmaRSkCQQCrCx4kFJtIvKic/XiMwUtfZQN6eqC9
Fx/kqfI4iHN1DcXq430/8/qSQQ9kBbuyYFDPVYMhWvIsPflEJPqSZWthAkBA4BQ3
Ygu2Xmkxpxo/Yenf150R7TIfHTcVU3tBQENpjMCHDwS+hymjw2VrRmqH773JTQ0+
gkwvuZwYC+ld8lIV`
export default{
  // 加密
  setEncrypt: function(msg){
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(key)
    return jsencrypt.encrypt(msg)
  },
  // 解密
  decrypt: function(msg){
    let decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    var decryptMsg = decrypt.decrypt(msg)
    return decryptMsg
  },
}

/*
import { JSEncrypt } from 'jsencrypt'
export default{
 data(){
     // 加密公钥
     var key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsheS3+o4+RyWFmtZ56AQZAlH0
     AQY93GnMqlvU2fNS4JIh49jRI3zrOXl+AbhHuZBatVOk/f9A5YeWQgRAyo5tF4HO
     fpEJm05RuMMTSZ6uNQ3y8ah/JuE76k0gC98B06LgRI7bNUof/HVlDj3Vdsu4nO7L
     fbcjIm0Y4HHkQfL08wIDAQAB`;
     // 解密私钥
     var privateKey = `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKyF5Lf6jj5HJYWa
     1nnoBBkCUfQBBj3cacyqW9TZ81LgkiHj2NEjfOs5eX4BuEe5kFq1U6T9/0Dlh5ZC
     BEDKjm0Xgc5+kQmbTlG4wxNJnq41DfLxqH8m4TvqTSAL3wHTouBEjts1Sh/8dWUO
     PdV2y7ic7st9tyMibRjgceRB8vTzAgMBAAECgYEAkeCZV/OViRVxpboaNnQ32sm6
     cD7Zfz87eqJmCeHMvDxFdECLmbOPMfqkPybHImbGp9yBAJcA2Wf7sNLbc8mSiUk5
     2tyWLMvg7z5Rtn7zvL9druG8bOAw1WmuC4Fw2R9nJeAssOcLJT8UrBBGwO6Z3No1
     Lccf5PrGUWNJQHseX8ECQQDlgf9WyVknAplOY2D8mz4+n5mtsBFHQo6T1+tJ2rnH
     /T9HjaHaPzg2tO3NIPmf8IlKFQOb20CDQdi8pS9niniTAkEAwG/76wpLTlPrdRBg
     lt82DephrQ/x+Hv9XLmB30DKyBB3k3ALngl+uW52CiOocGIa+TzkQnVG4TcamiJ1
     SzUuIQJBALF3F+4Pu3RCujC2/6PUlwjteHOplXK4sG75ouJ00vslg+zcQ67y+5Cx
     zr+zI9LcuAwku6mkm/nizKjyQfmaRSkCQQCrCx4kFJtIvKic/XiMwUtfZQN6eqC9
     Fx/kqfI4iHN1DcXq430/8/qSQQ9kBbuyYFDPVYMhWvIsPflEJPqSZWthAkBA4BQ3
     Ygu2Xmkxpxo/Yenf150R7TIfHTcVU3tBQENpjMCHDwS+hymjw2VrRmqH773JTQ0+
     gkwvuZwYC+ld8lIV`
  },
  // 加密
  setEncrypt: function(msg){
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(key)
    return jsencrypt.encrypt(msg)
  },
  // 解密
  decrypt: function(msg){
    let decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    var decryptMsg = decrypt.decrypt(msg)
    return decryptMsg
  },
}
*/