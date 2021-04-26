systemEquipment = {
   'Variable Air Volume': [
      {id: 1, type: 'multi zone',  name: 'vav1', qty: 2, notes: 'n/a'},
      {id: 2, type: 'multi zone',  name: 'vav2', qty: 1, notes: 'n/a'}, 
      {id: 3, type: 'single zone', name: 'vav3', qty: 1, notes: 'n/a'},
   ],
   'Boiler Plant': [
      {id: 1, type: 'Hot Water Boiler', name: 'boiler 1', qty: 1, notes: 'n/a'},
      {id: 2, type: 'Hot Water Boiler', name: 'boiler 2', qty: 2, notes: 'n/a'},
      {id: 3, type: 'Hot Water Boiler', name: 'boiler 3', qty: 2, notes: 'n/a'},
   ],
   'Water Source Heat Pump Loop': [
      {id: 1, type: 'Water Source Heat Pump', name: 'pump 1', qty: 1, notes: 'n/a'},
      {id: 2, type: 'Water Source Heat Pump', name: 'pump 2', qty: 1, notes: 'n/a'},
      {id: 3, type: 'Water Source Heat Pump', name: 'pump 3', qty: 2, notes: 'n/a'},
   ],
   'Independant Cooling Tower': [
      {id: 1, type: 'independant cooling tower', name: 'tower 1', qty: 2, notes: 'n/a'},
      {id: 2, type: 'independant cooling tower', name: 'tower 2', qty: 2, notes: 'n/a'},
      {id: 3, type: 'independant cooling tower', name: 'tower 3', qty: 2, notes: 'n/a'},
   ],
   'Variable Refrigerant Flow': [
      {id: 1, type: 'Variable Refrigerant Flow', name: 'fridge 1', qty: 1, notes: 'n/a'},
      {id: 2, type: 'Variable Refrigerant Flow', name: 'fridge 2', qty: 2, notes: 'n/a'},
      {id: 3, type: 'Variable Refrigerant Flow', name: 'fridge 3', qty: 1, notes: 'n/a'},
   ],
   'Chiller Plant': [
      {id: 1, type: 'chiller plant', name: 'chiller 1', qty: 1, notes: 'n/a'},
      {id: 2, type: 'chiller plant', name: 'chiller 2', qty: 1, notes: 'n/a'},
      {id: 3, type: 'chiller plant', name: 'chiller 3', qty: 2, notes: 'n/a'},
   ],
}


step4 = {
   'Variable Air Volume': [
      {id: 1, type: 'multi zone', name: 'vav1', 'multi zone AHUs': [
         {id: 1, type: 'vav boxes (reheat)'},
         {id: 2, type: 'vav boxes (reheat)'},
         {id: 3, type: 'vav boxes (reheat)'},
         {id: 4, type: 'vav boxes (cooling)'},
      ]  },
      {id: 2, type: 'multi zone', name: 'vav2','multi zone AHUs': [
         {id: 1, type: 'vav boxes (reheat)'},
         {id: 2, type: 'vav boxes (cooling)'},
      ]}, 
      {id: 3, type: 'single zone', name: 'vav3','single zone AHUs': [
         {id: 1, type: 'vav boxes (reheat)'},
         {id: 2, type: 'vav boxes (cooling)'},
         {id: 3, type: 'vav boxes (cooling)'},
      ]},
   ],
   'Boiler Plant': [
      {id: 1, type: 'Hot Water Boiler', name: 'boiler 1'},
      {id: 2, type: 'Hot Water Boiler', name: 'boiler 2'},
      {id: 3, type: 'Hot Water Boiler', name: 'boiler 3'},
   ],
   'Water Source Heat Pump Loop': [],
   'Independant Cooling Tower': [],
   'Variable Refrigerant Flow': [],
   'Chiller Plant': [
      {id: 1, type: 'chiller plant', name: 'chiller 1', 'water cooled chillers': [
         {id:1, type: 'water cooled chiller', 'cooling towers': [
            {id: 1, type: 'cooling tower'},
            {id: 2, type: 'cooling tower'},
         ]}
         {id:2, type: 'water cooled chiller', 'cooling towers': [
            {id: 1, type: 'cooling tower'}
         ]}
      ]}
   ],
}

a = {} 
a.dog = 'bark'
console.log(a)
a.cat
a.cat.cow = 'moo'
console.log(a)