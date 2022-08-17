$('#h1').mouseover(function (e) {
  e.preventDefault();
  $('#h1').html('background-coloryellow');
  $('#h1').text('background-colory');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/file/page/str',
    success: (res) => {
      alert('in res');
      const container = $('#buf');
      container.html(res);
      console.log(`res===>${res}`);
      return;
    },
    err: (xhr) => {
      alert('in err');
      console.log(xhr.status);
      console.log(xhr.messag);
      return;
    },
  });
});
