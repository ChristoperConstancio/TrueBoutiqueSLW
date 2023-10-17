import React from 'react'

export default function filterproductsucts(selectedValue, prod) {
   let products = prod;
    switch (selectedValue) {
        case 'chica':
            return  products.filter(item => item.size == 'chica');
            break;
        case 'mediana':
            return products.filter(item => item.size == 'mediana');
            break;
        case 'grande':
            return products.filter(item => item.size == 'grande');
            break;
        case 'extragrande':
            return  products.filter(item => item.size == 'extragrande');
            break;
        case 'barato':
            return  products.filter(item => item.price < 650);
            break;
        case 'caro':
            return products.filter(item => item.price > 650);
            break;
        case 'negro':
            return products.filter(item => item.color == 'negro');
            break;
        case 'azul':
            return products.filter(item => item.color == 'azul');
            break;
        case 'blanco':
            return products.filter(item => item.color == 'blanco');
            break;
        case 'rojo':
            return products.filter(item => item.color == 'rojo');
            break;
        case 'calvinklein':
            return products.filter(item => item.brand == 'calvinklein');
            break;
        case 'guess':
            return products.filter(item => item.brand == 'guess');
            break;
        case 'nautica':
            return products.filter(item => item.brand == 'nautica');
            break;
        case 'tommy':
            return products.filter(item => item.brand == 'tommy');
            break;
        case 'penguin':
            return products.filter(item => item.brand == 'penguin');
            break;
        case 'karl':
            return products.filter(item => item.brand == 'karl');
            break;
        case 'michael':
            return products.filter(item => item.brand == 'michael');
            break;

        default:
            
            break;
    }
    
}
