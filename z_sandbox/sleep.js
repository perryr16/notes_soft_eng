const sleep = (sec) => {
  return new Promise(resolve => setTimeout(resolve, sec*1000))
}
const printAuthToken = () => {
  const n = [...Array(30).keys()]
  for (const i of n) {
    await CanvasService.sleep(6)
    console.log('CANVAS_AUTH_TOKEN sleep: ', CANVAS_AUTH_TOKEN)
  }
}
sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec*1000))
},
async printAuthToken() {
  const n = [...Array(30).keys()]
  for (const i of n) {
    await CanvasService.sleep(6)
    console.log('CANVAS_AUTH_TOKEN sleep: ', CANVAS_AUTH_TOKEN)
  }
}