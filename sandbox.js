const systemDetails = [{systemName: "bbbb", qty: "22", zone: "Multi Zone"}, {systemName: "aaaa", qty: "11", zone: "Single Zone"}]

systemDetails.map(system => {
   // console.log(system)
   console.log(system.systemName)
   console.log(system.qty)
   console.log(system.zone)
})

systemDetails = [
  {
      'Water Source Heat Pump': [ // system name
         {name: "pump1", qty: 3}, // index 0
         {name: "pump2", qty: 4}, // index 1
      ]
   }
]

/* Needs: 
System id   --> parent id --> systemType
Array Index --> target id part 2
key         --> tareget id part 1
value       --> target value



*/