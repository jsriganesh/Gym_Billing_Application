export const validations ={
    name:{ required: 'Name is required' },
    mobileNo:{
        required: 'Mobile no is required',
        validate: (value: any) => {
            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) return 'Mobile no must be a number';
            return true;
        },
        minLength: {
            value: 10,
            message: 'please enter 10 characters',
        },
        maxLength: {
            value: 10,
            message: 'please enter 10 characters',
        },
    },
    email:{
        required: [false],
        pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Invalid email address',
        },

    },
    address:{ required: 'address is required' },
    gender:{ required: 'Gender is required' },
    packageType: {required: 'Package Type is required' },
    discountType:{ required: 'Discount plan is required' },
    discountValue:{required: 'Discount value required',
    validate: (value: any) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return 'Discount value must be a number';
        return true;
    },
    minLength: {
        value: 1,
        message: 'Please enter minimum 1 characters',
    },
    maxLength: {
        value: 2,
        message: 'max 3 characters',
    }
    },
    paidAmount:{
        required: 'paid amount required',
        validate: (value: any) => {
            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) return 'paid amount must be a number';
            return true;
        },
        minLength: {
            value: 1,
            message: 'Please enter minimum 1 characters',
        },
        maxLength: {
            value: 5,
            message: 'max 5 characters',
        },
    },
    paymentMode:{required: 'Payment mode is required' },
    dob:{required: 'dob is required' },
    doj:{required: 'doj is required' },
    required:{ required: 'This field is required' },

}