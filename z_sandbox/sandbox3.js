const systems = {
  'abc': [
    {id: 10, name: 0},
    {id: 11, name: 1},
  ],
  'xyz': [
    {id: 10, name: 0},
    {id: 11, name: 1},
  ]
}
const deletex = (system, id) => {
  systems[system] = systems[system].filter(sys=> sys.id != id)
  // return systems[system].filter(sys => sys.id !=id)
}

const findIndex = (system, id) => {
  index = systems[system].indexOf(systems[system].filter(system => system.id == id )[0])
  // console.log(array)
  // index = systems[system].indexOf(array)
  return index
}

const delKey = (system, key, id) => {
  index = findIndex(system, id) 
  // return index
  // return systems[system]
  delete systems[system][index][key]
}

// console.log(findIndex('xyz', 11))
console.log(delKey('xyz', 'name', 11))

console.log(systems)