function rarecolor(){
    let color;
    if(item.rarity == 'Common'){
        color = 'gray';
    } else if(item.rarity == 'Uncommon'){
        color = 'green';
    } else if(item.rarity == 'Rare'){
        color = 'steelblue';
    } else if(item.rarity == 'Very Rare'){
        color = 'purple';
    } else if(item.rarity == 'Legendary'){
        color = 'orange';
    } else {
        color = 'black';
    }
    return color;
}