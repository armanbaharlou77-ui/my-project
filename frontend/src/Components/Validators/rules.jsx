const requiredValue = 'Req-Val'
const maxValue = 'max-Val'
const minValue = 'min-Val'
const emailValue = 'email-Val'



export const requiredValidator = () => (
    {

        value: requiredValue

    }
)
export const maxValidator = (max) => (
    {

        value: maxValue,
        max

    }
)
export const minValidator = (min) => (
    {

        value: minValue,
        min

    }
)
export const emailValidator = () => (
    {

        value: emailValue

    }
)