

export const drivetimeUniqueIdentifierError = (text) => {
    return /[AZaz09_-]/.test(text)
}

export const saveDurationError = (number, durationType) => {

    switch(durationType){
        case 'minutes':
            if(number >= 60) return {error: true, message: "Minutes are already over an hour, Change your duration type to hours"}
            break;
        case 'hours':
            if(number >= 24) return {error: true, message: "Your Hours are already over a day, Change your duration type to days"}
            break;
    }

    return {error: false}

}

export const negativeInputsError = (number) => {
    if(number <= 0) return {error: true, message:"No Negative numbers allowed"}

    return {error: false}
}