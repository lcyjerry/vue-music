function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 洗牌函数，打乱播放列表顺序
export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) { //0 1 2 3 4 5
    let j = getRandomInt(0, i) //0 1 1 2 2 2
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}