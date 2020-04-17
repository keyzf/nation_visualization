import polygons from '@/data/bj-polygon-values'
import pieConfig from '@/config/echarts/pie'

export default function(info) {
  let gather = {
    name: '集聚场景',
    value: 0,
    data: []
  }
  let scattered = {
    name: '零星场景',
    value: 0,
    data: []
  }
  polygons.forEach(item => {
    if (item[0] === info.id) {
      if (item[1] === '小区') {
        scattered.value += item[4]
        scattered.data.push({ name: item[1], value: item[4] })
      } else {
        gather.value += item[3]
        gather.data.push({ name: `${item[1]}-${item[2]}`, value: item[3] })
      }
    }
  })
  let seriesData = [
    { name: gather.name, value: gather.value },
    { name: scattered.name, value: scattered.value }
  ]
  let seriesDataOne = [...gather.data, ...scattered.data]
  Object.assign(pieConfig, {
    title: {
      text: `网格面积: ${info.area}(平方公里)`
    }
  })
  Object.assign(pieConfig.series[0], { data: seriesData })
  Object.assign(pieConfig.series[1], { data: seriesDataOne })
  return pieConfig
}
