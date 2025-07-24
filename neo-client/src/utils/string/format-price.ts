export function formatPriceRU(price:number){
    return price.toLocaleString('ru-Ru',{
        style:'currency',
        currency:"RUB",
        minimumFractionDigits:0
    })
}

export function formatPriceAZE(price: number) {
    return price.toLocaleString('az-Latn-AZ', {
        style: 'currency',
        currency: 'AZN',
        minimumFractionDigits: 0
    });
}
