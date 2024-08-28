document.addEventListener('DOMContentLoaded', () => {
  const dataTable = document.getElementById('data-table')

  const chartData = {
    revenue: [400000, 420000, 450000, 480000, 500000, 470000, 500521],
    cash: [250000, 270000, 280000, 300000, 300000, 290000, 300000],
    'non-cash': [80000, 90000, 95000, 100000, 100000, 99000, 100000],
    'credit-cards': [85000, 90000, 95000, 100521, 100521, 98000, 100521],
    'avg-check': [1100, 1200, 1300, 1350, 1300, 1250, 1300],
    'avg-guest': [1000, 1100, 1150, 1200, 1200, 1100, 1200],
    'removal-after-payment': [1000, 1050, 1100, 1100, 1000, 1050, 1000],
    'removal-before-payment': [1200, 1250, 1300, 1300, 1300, 1250, 1300],
    'num-checks': [30, 32, 34, 36, 34, 33, 34],
    'num-guests': [30, 32, 34, 36, 34, 33, 34],
  }

  function applyBackgrounds() {
    document.querySelectorAll('#data-table tbody tr').forEach((tr) => {
      const valueCell = tr.querySelector('.this-week-day')
      if (valueCell) {
        const value = parseFloat(valueCell.textContent.replace(/\s+/g, ''))
        if (value === 34) {
          valueCell.classList.add('neutral-bg')
        } else if (value >= 1000000) {
          valueCell.classList.add('high-bg')
        } else if (value <= 1000) {
          valueCell.classList.add('low-bg')
        }
      }
    })

    document
      .querySelectorAll('#data-table tbody tr .change-neutral-bg')
      .forEach((cell) => {
        const percentageElem = cell.querySelector('span:nth-of-type(2)')
        const valueElem = cell.querySelector('span:nth-of-type(1)')

        if (percentageElem && valueElem) {
          const percentage = percentageElem.textContent
          if (percentage === '0%') {
            percentageElem.classList.add('change-zero-percent')
            valueElem.classList.add('change-zero-value')
          }
        }
      })
  }

  applyBackgrounds()

  dataTable.addEventListener('click', (event) => {
    const row = event.target.closest('tr')
    if (!row || !row.dataset.chart) return

    document.querySelectorAll('.chart-row').forEach((el) => el.remove())

    const nextRow = row.nextElementSibling

    const chartRow = document.createElement('tr')
    chartRow.classList.add('chart-row', 'active')
    const chartCell = document.createElement('td')
    chartCell.setAttribute('colspan', 4)
    chartCell.innerHTML =
      '<div id="chart-container" class="chart-container"></div>'
    chartRow.appendChild(chartCell)

    if (nextRow) {
      nextRow.insertAdjacentElement('beforebegin', chartRow)
    } else {
      row.insertAdjacentElement('afterend', chartRow)
    }

    const chartType = row.dataset.chart
    const data = chartData[chartType]

    Highcharts.chart('chart-container', {
      chart: {
        type: 'line',
      },
      title: {
        text: `График: ${row.cells[0].innerText}`,
      },
      xAxis: {
        categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      },
      yAxis: {
        title: {
          text: 'Значение',
        },
      },
      series: [
        {
          name: row.cells[0].innerText,
          data: data,
        },
      ],
    })
  })
})
