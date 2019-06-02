$('#itemtype-select').on('change', function(){
    if(this.value == 'Armor'){
        $('#armortype-select-div').removeClass('hidden')
        $('#weapontype-select-div').addClass('hidden');
        $('#weapon-traits-div').addClass('hidden');
    }
    else if(this.value == 'Weapon(melee)'){
        $('#armortype-select-div').addClass('hidden')
        $('#weapontype-ranged-select-div').addClass('hidden');
        $('#weapontype-melee-select-div').removeClass('hidden');
        $('#weapon-traits-div').removeClass('hidden');
    }
    else if(this.value == 'Weapon(ranged)'){
        $('#armortype-select-div').addClass('hidden')
        $('#weapontype-ranged-select-div').removeClass('hidden');
        $('#weapontype-melee-select-div').addClass('hidden');
        $('#weapon-traits-div').removeClass('hidden');
    }
    else{
        $('#armortype-select-div').addClass('hidden');
        $('#weapontype-melee-select-div').addClass('hidden');
        $('#weapontype-ranged-select-div').addClass('hidden');
        $('#weapon-traits-div').addClass('hidden');
    }
});