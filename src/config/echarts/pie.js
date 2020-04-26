export default {
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['20%', '50%'],
      center: ['45%', '60%'],
      label: {
        formatter: val => {
          let name = val.name.split('-')[0]
          let bValue = val.name.split('-')[1]
          return `${name}建筑物: ${bValue}栋, 客户: ${val.value}个`
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
