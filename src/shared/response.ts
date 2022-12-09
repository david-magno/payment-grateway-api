export class CommonResponses{
    static success = {
        http:200,
        code:'00',
        message:"Successful"
    }
    static requestInProgress = {
        http:202,
        code:'00',
        message:"Bad Request"
    }
    static badRequest = {
        http:400,
        code:'00',
        message:"Bad Request"
    }
    static invalidFieldFormat = {
        http:400,
        code:'01',
        message:"Invalid Field Format"
    }
    static invalidMandatoryField = {
        http:400,
        code:'02',
        message:"Invalid Mandatory Field"
    }
    static unauthorized = {
        http:401,
        code:'00',
        message:"Unauthorized Access"
    }
    static invalidToken = {
        http:401,
        code:'01',
        message:"Invalid Token"
    }
    static invalidCustomerToken = {
        http:401,
        code:'02',
        message:"Invalid Customer Token"
    }
    static tokenNotFound = {
        http:401,
        code:'03',
        message:"Token Not Found"
    }
    static customerTokenNotFound = {
        http:401,
        code:'04',
        message:"Customer Token Not Found"
    }
    static transactionExpired = {
        http:403,
        code:'00',
        message:"Transaction Expired"
    }
    static featureNotAllowed = {
        http:403,
        code:'01',
        message:"Bad Request"
    }
    static exceededAmountLimit = {
        http:403,
        code:'02',
        message:"Bad Request"
    }
    static suspectedFraud = {
        http:403,
        code:'03',
        message:"Suspected Fraud"
    }
    static activityCountLimitExceeded = {
        http:403,
        code:'04',
        message:"Activity Count Limit Exceeded"
    }
    static doNotHonor = {
        http:403,
        code:'05',
        message:"Do Not Honor"
    }
}

export class ResponseService{
    static errorResponse(response){
        return response;
    }
}