export interface OrderData{
    phoneNumber:string,
    shippingAddress: string,
    totalAmount: number,
    paymentDetails: {
        paymentMethod: PaymentMethod,
        paymentStatus?: PaymentStatus,
        pidx?: string

    },
    items: OrderDetails[]
}


export interface OrderDetails{
    quantity:number,
    productId: string,

}


export enum PaymentMethod{
    Cod = 'cod',
    Khati = 'khalti'
}

export enum PaymentStatus{
    Paid = 'paid',
    Unpaid = 'unpaid'
}

export interface KhaltiResponse{
    pidx:string,
    payment_url: string,
    expires_at: Date | string
    expires_in: number
    user_fee: number
}


export interface TransactionVerificationResponse{
    pidx: string,
    total_amount: number,
    status: TranscationStatus,
    transaction_id: string,
    fee: number,
    refunded: boolean
}

export enum TranscationStatus{
    Completed = 'Completed',
    Refunded = 'Refunded',
    Pending = 'Pending',
    Initiated = 'Initiated'
}

