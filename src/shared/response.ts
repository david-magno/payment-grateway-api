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
    static featureNotAllowedAtThisTime = {
        http:403,
        code:'06',
        message:"Feature Not Allowed at This Time"
    }
    static cardBlocked = {
        http:403,
        code:'07',
        message:"Card Blocked"
    }
    static cardExpired = {
        http:403,
        code:'08',
        message:"Card Expired"
    }
    static dormantAccount = {
        http:403,
        code:'09',
        message:"Dormant Account"
    }
    static setTokenLimit = {
        http:403,
        code:'10',
        message:"Need to Set Token Limit"
    }
    static OTPBlocked = {
        http:403,
        code:'11',
        message:"OTB Blocked"
    }
    static OTPLifetimeExpired = {
        http:403,
        code:'12',
        message:"OTP Lifetime Expired"
    }
    static OTPSentToCardHolder = {
        http:403,
        code:'13',
        message:"OTP Sent to Cardholder"
    }
    static insufficientFunds = {
        http:403,
        code:'14',
        message:"Insufficient Funds"
    }
    static transactionNotPermitted = {
        http:403,
        code:'15',
        message:"Transaction Not Permitted"
    }
    static suspendedTransaction = {
        http:403,
        code:'16',
        message:"Suspend Transaction"
    }
    static tokenLimitExceeded = {
        http:403,
        code:'17',
        message:"Token Limit Exceeded"
    }
    static inactiveAccount = {
        http:403,
        code:'18',
        message:"Inactive Account"
    }
    static merchantBlacklisted = {
        http:403,
        code:'19',
        message:"Merchant Blacklisted"
    }
    static merchantLimitExceeded = {
        http:403,
        code:'20',
        message:"Merchant Limit Exceed"
    }
    static setLimitNotAllowed = {
        http:403,
        code:'21',
        message:"Set Limit Not Allowed"
    }
    static tokenLimitInvalid = {
        http:403,
        code:'22',
        message:"Token Limit Invalid"
    }
    static accountLimitExceed = {
        http:403,
        code:'23',
        message:"Token Limit Exceeded"
    }
    static invalidTransactionStatus = {
        http:404,
        code:'00',
        message:"Invalid Transaction Status"
    }
    static transactionNotFound = {
        http:404,
        code:'01',
        message:"Transaction Not Found"
    }
    static invalidRouting = {
        http:404,
        code:'02',
        message:"Invalid Routing"
    }
    static BankNotSupported = {
        http:404,
        code:'03',
        message:"Bank Not Supported By Switch"
    }
    static transactionCancelled = {
        http:404,
        code:'04',
        message:"Transaction Cancelled"
    }
    static merchantNotRegistered = {
        http:404,
        code:'05',
        message:"Merchant Is Not Registered For Card Registration Services"
    }
    static needToReqOTP = {
        http:404,
        code:'06',
        message:"Need To Request OTP"
    }
    static journeyNotFound = {
        http:404,
        code:'07',
        message:"Journey Not Found"
    }
    static invalidMerchant = {
        http:404,
        code:'08',
        message:"Invalid Merchant"
    }
    static noIssuer = {
        http:404,
        code:'09',
        message:"No Issuer"
    }
    static invalidAPITransition = {
        http:404,
        code:'10',
        message:"Invalid API Transition"
    }
    static invalidAccount = {
        http:404,
        code:'11',
        message:"Invalid Account"
    }
    static invalidBill = {
        http:404,
        code:'12',
        message:"Invalid Bill"
    }
    static invalidAmount = {
        http:404,
        code:'13',
        message:"Invalid Amount"
    }
    static paidBill = {
        http:404,
        code:'14',
        message:"Paid Bill"
    }
    static invalidOTP = {
        http:404,
        code:'15',
        message:"Invalid OTP"
    }
    static partnerNotFound = {
        http:404,
        code:'16',
        message:"Partner Not Found"
    }
    static invalidTerminal = {
        http:404,
        code:'17',
        message:"Invalid Terminal"
    }
    static inconsistenRequest = {
        http:404,
        code:'18',
        message:"Inconsistent Request"
    }
    static invalidBill_virtualAccount = {
        http:404,
        code:'19',
        message:"Invalid Bill/Virtual Account"
    }
    static requestFunctionNotSupported = {
        http:405,
        code:'00',
        message:"Request Function Is Not Supported"
    }
    static requestOperationNotAllowed = {
        http:405,
        code:'01',
        message:"Request Operation Is Not Allowed"
    }
    static conflict = {
        http:409,
        code:'00',
        message:"Conflict"
    }
    static duplicatePartnerReferenceNo = {
        http:409,
        code:'01',
        message:"Duplicate partnerReferenceNo"
    }
    static tooManyRequest = {
        http:429,
        code:'00',
        message:"Too Many Request"
    }
    static generalError = {
        http:500,
        code:'00',
        message:"General Error"
    }
    static internalServerError = {
        http:500,
        code:'01',
        message:"Internal Server Error"
    }
    static externalServerError = {
        http:500,
        code:'02',
        message:"External Server Error"
    }
    static timeout = {
        http:504,
        code:'00',
        message:"Timeout"
    }
}

export class ExchangePaymentNotifResponse{
    static success(responseMessage){
        return{
            responseCode:"2001800",
            responseMessage
        }
    }
}

export class ResponseService{
    errorResponse(response){
        return response;
    }

    errorResponseParam(response,parameter){
        let newResponse = {
            http:response.http,
            code:response.code,
            message: `${response.message}: ${parameter}`
        }

        return newResponse
    }
}