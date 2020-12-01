import { Moment } from 'moment';

export interface AddressInterface {
    id?: number
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    creationDate?: Moment
}
