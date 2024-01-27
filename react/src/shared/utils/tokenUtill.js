class TokenUtill {
    static tokenData;
    static userName;

    static printSum = (data) => {
        this.tokenData = data;
        return data;
    };

    static getUserName = (data) => {
        this.userName = data;
        return data;
    }

    static printuserName = () => {
        return Promise.resolve(this.userName);
    }

    static getPromiseData = () => {
        return Promise.resolve(this.tokenData);
    };

    static printSumData = () => {
        return this.tokenData;
    };
    
}
export default TokenUtill;