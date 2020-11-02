import axios from 'axios';
import { constants } from '../../utils/constants/constants';
import { ActionTypes } from '../../redux/index';
import { AsyncStorage } from 'react-native';
import {
    useDispatch
} from 'react-redux';
// import {setLoggedInUser} from '../../screens/login/Login.Action';
class NetworkManager {
    baseUrl = constants.webService.baseURL;
    getRequestHandlerWithOutHeader = (requestMethod, params) => {

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${this.baseUrl}${requestMethod}`, { params });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getRequestHandler = (requestMethod, params, token) => {
              // console.log(token);
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${this.baseUrl}${requestMethod}`, {params}, axios.defaults.headers.Authorization = `Bearer ${token}`);
                resolve(response.data);
            } catch (error) {
               
                if (error.response.status === 401) {
                    AsyncStorage.getItem('token').then((tokenValue) => {
                        AsyncStorage.getItem('refershToken').then((refershTokenvalue) => {
                        this.getRefershToken(tokenValue, refershTokenvalue);
                   });
                 });
                }
                reject(error);
            }
        });
    }

    postRequestHandler = (requestMethod, params, token) => {

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${this.baseUrl}${requestMethod}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`);
                resolve(response.data);
            } catch (error) {
                if (error.response.status === 401) {

                    AsyncStorage.getItem('token').then((tokenValue) => {
                        AsyncStorage.getItem('refershToken').then((refershTokenvalue) => {
                            this.getRefershToken(tokenValue, refershTokenvalue);
                        });
                    });
                }
                reject(error);
            }
        });
    }

    postRequestWithOutHeaderHandler = (requestMethod, params) => {
        
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${this.baseUrl}${requestMethod}`, params);
                console.log(response);
                resolve(response.data);
            } catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }


    putRequestHandler = (requestMethod, params, callback) => {
        axios.put(`${this.baseUrl}${requestMethod}`, params)
            .then(({ data }) => {
               
                callback(null, data);
            })
            .catch((error) => {
               
                callback(error, null);
            });
    }

    deleteRequestHandler = (requestMethod, params, callback) => {
        axios.delete(`${this.baseUrl}${requestMethod}`, params)
            .then(({ data }) => {
                
                callback(null, data);
            })
            .catch((error) => {
               
                callback(error, null);
            });
    }
    getRefershToken = (tokens, refreshTokens) => {
            // use dispatch hooks 
         try {
             const params = {
                 token: tokens,
                     refreshToken: refreshTokens
             }
             console.log('Parameter in Network Details');
             console.log(JSON.stringify(params));
             console.log(`${this.baseUrl}${constants.webService.methods.auth.getRefershToken}`)
             const options = {
                 headers: {
                     "ApiKey": "MySecretAPI123Key"
                 }
             };
             console.log(options);
             axios.post(`${this.baseUrl}${constants.webService.methods.auth.getRefershToken}`, params, options)
             .then(res => {
               console.log('Network Details 401 response');
               const response = res['data'];
               console.log(res)
               const jsonResponse = response['data'];
               const {
                   token,
                   refreshToken
               } = jsonResponse;
               console.log(token, refreshToken);
               if (res.data.statusCode == "200" && res.data != null) {
                     console.log('Get refersh token success');
                     AsyncStorage.setItem('token', token);
                     AsyncStorage.setItem('refershToken', refreshToken);
                 } else {
                   
                 }   
             })
             .catch(error => console.log('Get refersh token error', error.response));
             // alertWithMessage(error);
             
         } catch (error) {
             
         }
    }
}

const networkManager = new NetworkManager();
export default networkManager;


export const setLoggedInUser = (userId, token, refreshToken) => {
    return {
        type: ActionTypes.login.SET_LOGGED_IN_USER,
        payload: {
            userId, 
            token,
            refreshToken
        },
    };
}