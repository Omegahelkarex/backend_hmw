class ApiResponse{
    constructor(statusCode, data, message){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message ;
        this.success = statusCode; // ask tushar why number and the condition are given and also about photo url string and also photo in the schema of the patient and doctors and also mongoose aggrigate paginate , also ask about the access_secret_token , access_expiry_token, refresh_token_secret and refresh_token_expiry
    }
}
export {ApiResponse};