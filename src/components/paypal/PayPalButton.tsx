'use client'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { setTransactionId } from '../../actions/payments/setTransactionId';
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payments';


interface Props {
  orderId: string;
  amount: number
}


export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className="animate-pulse my-5">
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded mt-3" />


      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: roundedAmount.toString(),
          }

        }
      ],
      intent: 'CAPTURE'
    })

    const { ok } = await setTransactionId(orderId, transactionId)
    if (!ok) {
      throw new Error('No se pudo completar la transaccion')
    }
    return transactionId
  }



  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return
    await paypalCheckPayment(details!.id)
  }


  return (

    <div className='relative z-0'>

      <PayPalButtons className='mt-5'
        createOrder={createOrder}
        onApprove={onApprove}
      />

    </div>



  )
}
