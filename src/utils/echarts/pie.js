import markers from '@/data/cy-markers'
import pieConfig from '@/config/echarts/pie'

export default function(obj) {
  let polygon = obj.polygon
  let list = {}
  let houses = 0
  let housesBuilding = 0
  markers.forEach(item => {
    let lng = Number(item.lng)
    let lat = Number(item.lat)
    let isInPolygon = polygon.contains([lng, lat])
    if (isInPolygon) {
      if (item.type !== '小区') {
        if (!list[item.type]) {
          list[item.type] = {
            count: 1,
            customers: Number(item.count)
          }
        } else {
          list[item.type].count++
          list[item.type].customers += Number(item.count)
        }
      } else if (item.type === '小区' && item.resident) {
        housesBuilding++
        houses += Number(item.resident)
      }
    }
  })
  Object.assign(pieConfig, {
    title: {
      text: `ID: ${obj.id}, 网格面积: ${(polygon.getArea() / 1000000).toFixed(
        2
      )}(平方公里)`,
      subtext: `小区数量: ${housesBuilding}, 住宅数量: ${houses} 个`,
      subtextStyle: {
        color: '#000'
      }
    }
  })
  let data = []
  Object.keys(list).forEach(key => {
    data.push({
      name: `${key}-${list[key].count}`,
      value: list[key].customers
    })
  })
  Object.assign(pieConfig.series[0], { data: data })
  return pieConfig
}
