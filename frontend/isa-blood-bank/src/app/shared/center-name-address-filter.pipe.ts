import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "centerSearchComponent"})

export class CenterNameAddressFilterPipe implements PipeTransform{
    transform(items: any, name: string, streetName: string, townName: string) {
        if(items && items.length){
            return items.filter((item: any)=>{
                if(name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if(streetName && item.address.streetName.toLowerCase().indexOf(streetName.toLowerCase()) == -1){
                    return false;
                }
                if(townName && item.address.town.toLowerCase().indexOf(townName.toLowerCase()) == -1){
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