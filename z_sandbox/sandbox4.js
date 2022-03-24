const currentTabImages = {
  'Strategy': '../../../../static/img/software-strategy14.jpg',
  'Design': '../../../../static/img/design-workshop7.jpg', 
  'Product Management': '../../../../static/img/devetry-team3.jpg',
  'Technology': '../../../../static/img/code-on-computer3.jpg',
  'Innovation': '../../../../static/img/office-conversation.jpg',
}

const x = {
  Strategy: 12,
  Design: 23,
  'Product Management': 34,
  Technology: 45,
  Innovation: 56
}

const keys = Object.keys(x)

console.log(currentTabImages[keys[0]])