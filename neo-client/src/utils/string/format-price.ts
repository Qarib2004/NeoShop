export function formatPriceRU(price:number){
    return price.toLocaleString('ru-Ru',{
        style:'currency',
        currency:"RUB",
        minimumFractionDigits:0
    })
}

export function formatPriceAZE(price: number): string {
    // Простое форматирование без локализации - одинаково везде
    return `${Math.round(price)} AZN`;
}
