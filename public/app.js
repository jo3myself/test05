$(document).ready(function () {
  var startID
  var stopID
  var dataID
  var datalink
  var model

  $('.progress').hide()

  $('#go').click(function () {
    startID = $('#start').val().trim()
    stopID = $('#stop').val().trim()
    dataID = startID
    if ((startID) && (stopID)) {
      $('#dataTable').empty()
      $('.progress').show()
      search()
    } else {
      alert('No blank field')
    }
  })

  function search () {
    $.ajax({
      method: 'GET',
      url: '/scrape/' + dataID
    })
    .done(function (data) {
      model = data.trim()
      var newModel = model.slice(0, 4)
      switch (newModel) {
        case 'HP/C':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=hew&line=data%20data&model=' + dataID
          break
        case 'Tosh':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=tos&line=data%20data&model=' + dataID
          break
        case 'Dell':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=del&line=data%20data&model=' + dataID
          break
        case 'Acer':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=ace&line=data%20data&model=' + dataID
          break
        case 'Leno':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=len&line=data%20data&model=' + dataID
          break
        case 'ASUS':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=asu&line=data%20data&model=' + dataID
          break
        case 'Supe':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=smi&line=data%20data&model=' + dataID
          break
        case 'IBM ':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=ibm&line=data%20data&model=' + dataID
          break
        case 'Appl':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=app&line=data%20data&model=' + dataID
          break
        case 'Fuji':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=fuj&line=data%20data&model=' + dataID
          break
        case 'Cisc':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=cis&line=data%20data&model=' + dataID
          break
        case 'Inte':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=int&line=data%20data&model=' + dataID
          break
        case 'Sony':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=son&line=data%20data&model=' + dataID
          break
        case 'Sun/':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=sun&line=data%20data&model=' + dataID
          break
        case 'Pana':
          datalink = 'https://www.kingston.com/us/memory/search?mfr=pan&line=data%20data&model=' + dataID
          break
        default:
          datalink = 'Search'
      }
      insertTable()
    })
  }

  function insertTable () {
    var myrow = $('<tr>')
    myrow.append('<td>' + dataID + '</td>')
    myrow.append('<td>' + model + '</td>')
    myrow.append('<td>' + datalink + '</td>')
    $('#dataTable').prepend(myrow)
    if (dataID < stopID) {
      dataID++
      search()
    } else {
      $('.progress').hide()
      $('#start, #stop').val('')
    }
  }
})
