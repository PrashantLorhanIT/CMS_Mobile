import NetInfo from "@react-native-community/netinfo";

export default class Reachability {

    static checkReachability = (callback) => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            console.log(`is Internet Reachable: ${state.isInternetReachable}`);
            callback(state.isInternetReachable);
        });

        this.unsubscribe = unsubscribe;
    }

    static unsubscribeFromReachabilityUpdates = () => {
        this.unsubscribe();
    }
}