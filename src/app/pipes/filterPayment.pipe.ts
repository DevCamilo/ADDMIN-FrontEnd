import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPayment'
})
export class FilterPaymentPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPayment = [];
    for (const payment of value) {
      if (payment.id_type_payment.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPayment.push(payment);
      } else if (payment.id_user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPayment.push(payment);
      } else if (payment.original_value.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPayment.push(payment);
      }
    }
    return resultPayment;
  }

}
