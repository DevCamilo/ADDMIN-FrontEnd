import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUser = [];
    for (const user of value) {
      if (user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user);
      } else if (user.lastName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user);
      } else if (user.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user);
      } else if (user.telephone.indexOf(arg) > -1) {
        resultUser.push(user);
      }
    }
    return resultUser;
  }

}
