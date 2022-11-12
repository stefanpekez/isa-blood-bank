import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchFilter"
})
export class UserNameSurnameFilterPipe implements PipeTransform {
    transform(items: any, name: string, surname: string) {
        if (items && items.length){
            return items.filter((item: any) =>{
                if (name&& item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if (surname && item.surname.toLowerCase().indexOf(surname.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}