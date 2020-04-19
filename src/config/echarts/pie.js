export default {
  series: [
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner'
      },
      labelLine: {
        show: false
      },
      data: []
    },
    {
      name: '',
      type: 'pie',
      radius: ['40%', '55%'],
      label: {
        formatter: val => {
          let name = val.name.split('-')[0]
          let bValue = val.name.split('-')[1]
          if (name === '小区') {
            return `${name}住宅套数: ${val.value}个, 建筑物: ${bValue}栋`
          }
          return `${name}客户: ${val.value}个, 建筑物: ${bValue}栋`
        },
        color: '#303133',
        borderWidth: 1,
        borderRadius: 4,
        lineHeight: 18,
        padding: 4,
        fontSize: 10,
        position: 'outside'
      },
      data: []
    }
  ]
}
