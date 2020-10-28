import * as Keychain from 'react-native-keychain';
import { errors } from '../../utils/constants/errors';

const BiometricType = {
    TouchID: 'TouchID',
    FaceID: 'FaceID',
    Fingerprint: 'Fingerprint'
}
export default class SecurityManager {
    constructor() {
    }

    setCredentialsInKeychain = async(userToken, ridUsermaster) => {

        console.log(userToken);
        console.log(ridUsermaster);         
        return new Promise(async (resolve, reject) => {
            try {
                // const options = {
                //     service: 'com.hs.testing',
                //     accessControl: 'BiometryAnyOrDevicePasscode',
                //     accessible: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY'
                // };
                const options = {};
                const isSuccess = await Keychain.setGenericPassword(userToken, ridUsermaster, options);
                resolve(isSuccess);
            } catch (error) {
                console.log('ERROR INSIDE Security.setUsernamePasswordInKeychain');
                console.log(error);
                reject(errors.security.unableToSetCredentials);
            }
        });
    }

    getCredentialsFromKeychain = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // const options = {
                //     service: 'com.hs.testing',
                // }
                const options = {};
                const credentials = await Keychain.getGenericPassword(options);
                console.log('Credentials');
                console.log(credentials);
                resolve(credentials);
            } catch (error) {
                console.log('ERROR INSIDE Security.setUsernamePasswordInKeychain');
                console.log(error);
                reject(errors.security.unableToSetCredentials);
            }
        });
    }

    resetCredentialsFromKeychain = () => {
        return new Promise(async (resolve, reject) => {
            try {
                // const options = {
                //     service: 'com.hs.testing',
                // }
                const options = {};
                const resolved = await Keychain.resetGenericPassword(options);
                resolve(resolved);
            } catch (error) {
                console.log('ERROR INSIDE Security.resetCredentialsFromKeychain');
                console.log(error);
                reject(errors.security.unableToSetCredentials);
            }
        });
    }
}