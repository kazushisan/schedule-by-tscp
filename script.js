$(function(){
  var fullScreenWindow = $('div#fullScreenWindow');
  var fullScreenAbout = $('div#fullScreenAbout');
  var windowH1 = $('div.window header > h1');
  var classButton = $('div.window form > div:nth-of-type(1) input');
  var subBlockButton = $('div.window form > div:nth-of-type(2) input');
  var blockButton = $('div.window form > div:nth-of-type(3) input');
  var week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  var block, subBlock, day, period;
  var inputClass, inputTeacher, inputRoom;

  var timeTable = {
    'Monday': {'p1': 'I-A', 'p2': 'II-A', 'p3': 'III-A', 'p4': 'IV-A', 'p5': 'V-A', 'p6': 'VI', 'p7': 'LHR'},
    'Tuesday': {'p1': 'II-B', 'p2': 'I-B', 'p3': 'V-B', 'p4': 'V-A', 'p5': 'IV-B', 'p6': 'IV-A', 'p7':'III-B'},
    'Wednesday': {'p1': 'III-A', 'p2': 'II-A', 'p3': 'VI', 'p4': 'IV-B', 'p5': 'V-B', 'p6': 'I-A', 'p7':'I-B'},
    'Thursday': {'p1': 'II-A', 'p2': 'II-B', 'p3': 'I-A', 'p4': 'V-A', 'p5': 'IV-A', 'p6': 'III-B', 'p7':'VI'},
    'Friday': {'p1': 'III-B', 'p2': 'II-B', 'p3': 'VI', 'p4': 'IV-B', 'p5': 'V-B', 'p6': 'I-B', 'p7':'III-A'}
  }

  var myTimeTable = {
    'Monday': {},
    'Tuesday': {},
    'Wednesday': {},
    'Thursday': {},
    'Friday': {}
  }

  $('button#start').on('click', function(){
    window.location.href = 'create.html';
  });

  $('a.about').on('click', function(){
    fullScreenAbout.css({
      display: 'block'
    });
  });

  $('div.about button.round').on('click', function(){
    fullScreenAbout.css({
      display: ''
    });
  });

  for(var d in myTimeTable){
    myTimeTable[d] = {};
    for (var i = 1; i <= 7; i++) {
      myTimeTable[d]['p' + String(i)] = '';
    }
  }

  $(window).on('load', function(){
    var selectedCell, dayName;
    for(var d = 0; d < 5; d++){
      dayName = week[d];
      for(var p = 0; p < 7; p++){
        selectedCell = $('table tr').eq(p+1).children('td:nth-of-type(' + String(d+1) + ')');
        selectedCell.html(timeTable[dayName]['p' + String(p+1)]);
      }
    }

    $('table tr:nth-of-type(8) td:first-of-type').css({
      cursor: 'inherit'
    });
  });

  function getInputValue(){
    inputClass = $('div.window form input[name="class"]').val().toString();
    inputTeacher = $('div.window form input[name="teacher"]').val().toString();
    inputRoom = $('div.window form input[name="room"]').val().toString();
  }

  function mttCheck(data){
    if(data === "" || data === null || data === undefined){
        return false;
    }else{
        return true;
    }
  }

  function loadTimeTable(){
    var dayName, periodName;
    for(var d = 0; d < 5; d++){
      dayName = week[d];
      for(var p = 0; p < 7; p++){
        selectedCell = $('table tr').eq(p+1).children('td:nth-of-type(' + String(d+1) + ')');
        periodName = 'p' + String(p+1);
        if(mttCheck(myTimeTable[dayName][periodName][0])){
          selectedCell.html(myTimeTable[dayName][periodName][0] + '<br/>' + myTimeTable[dayName][periodName][1] + '<br/>' + myTimeTable[dayName][periodName][2]).addClass('hasInput');
        } else {
          selectedCell.html(timeTable[dayName][periodName]).removeClass('hasInput');
        }
      }
    }
    console.log(myTimeTable);
  }

  function exitWindow(){
    fullScreenWindow.css({
      display: ''
    });
    $('div.window form input[name="class"]').val('');
    $('div.window form input[name="teacher"]').val('');
    $('div.window form input[name="room"]').val('');
  }

  $('table td').on('click', function(){
    var selectedPeriod, selectedDay;
    period = $(this).parent('tr').index();
    day = $(this).index();
    period = 'p' + String(period);
    day = week[day-1];

    if(day == 'Monday' && period == 'p7') return;

    if (timeTable[day][period] == 'VI') {
      block = 'VI';
      subBlock = null;
      subBlockButton.parent('div').css({
        display: 'none'
      });
    } else {
      block = timeTable[day][period].substring(0, timeTable[day][period].length-2);
      subBlock = timeTable[day][period].substr(-1);
        subBlockButton.parent('div').css({
          display: ''
        });
    }

    if(mttCheck(myTimeTable[day][period][0])) $('div.window form input[name="class"]').val(myTimeTable[day][period][0]);
    if(mttCheck(myTimeTable[day][period][1])) $('div.window form input[name="teacher"]').val(myTimeTable[day][period][1]);
    if(mttCheck(myTimeTable[day][period][2])) $('div.window form input[name="room"]').val(myTimeTable[day][period][2]);

    windowH1.html(day + ',<br/> Period ' + period.substr(1));
    subBlockButton.val(block + '-' + subBlock);
    blockButton.val(block);

    fullScreenWindow.css({
      display: 'block'
    });
  });

  classButton.on('click', function(){
    getInputValue();
    myTimeTable[day][period] = [inputClass, inputTeacher, inputRoom];
    loadTimeTable();
    exitWindow();
  });


  function ttFind(value){
    var returnArray = [];
    for (var d in timeTable){
      for(var p in timeTable[d]){
        if(timeTable[d][p] == value) returnArray.push([d, p]);
      }
    }
    return returnArray;
  }

  subBlockButton.on('click', function(){
    var classList = ttFind(timeTable[day][period]);
    getInputValue();

    var d, p;
    for (var i = 0; i < classList.length; i++) {
      d = classList[i][0];
      p = classList[i][1];
      myTimeTable[d][p] = [inputClass, inputTeacher, inputRoom];
    }

    loadTimeTable();
    exitWindow();
  });

  blockButton.on('click', function(){
    var classList = ttFind(timeTable[day][period]);
    switch (subBlock) {
      case 'A':
        Array.prototype.push.apply(classList, ttFind(block + '-B'));
        break;
      case 'B':
        Array.prototype.push.apply(classList, ttFind(block + '-A'));
        break;
    }
    getInputValue();

    var d, p;
    for (var i = 0; i < classList.length; i++) {
      d = classList[i][0];
      p = classList[i][1];
      myTimeTable[d][p] = [inputClass, inputTeacher, inputRoom];
    }

    loadTimeTable();
    exitWindow();
  });

  $('div.window button.round').on('click', function(){
    exitWindow();
  });

  $('button#makeTimeTable').on('click', function(){
    var font = '"Helvetica Neue", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif';
    var color = '#fff';
    var periodTime = ['08:40', '09:35', '10:30', '11:25', '12:20', '12:50', '13:45', '14:40', '15:30'];
    var selectBackground = $('input#selectBackground');
    var file = selectBackground.prop('files')[0];
    myTimeTable['Monday']['p7'] = ['Long Homeroom','' ,''];

    function draw(){
      var h = 496;
      var hArray = [];
      var dArray = [];
      var dayName, text;
      for (var i = 592; i < 1952; i = i + 272) {
        dArray.push(i);
      }
      for (var i = 0; i < 9; i++) {
        timeTableOutput.drawLine({
          strokeStyle: color,
          strokeWidth: 2,
          x1: 592, y1: h,
          x2: 1952, y2: h
        }).drawText({
          fillStyle: color,
          x: 496, y: h-18,
          fontFamily: font,
          fontSize: 36,
          align: 'left',
          text: periodTime[i],
          fromCenter: false
        });
        if (h == 1296) {
          h = h + 56;
        } else {
          hArray.push(h);
          h = h + 200;
        }
      }
      for (var d = 0; d < 5; d++) {
        dayName = week[d];
        for (var i = 0; i < 7; i++) {
          if(mttCheck(myTimeTable[dayName]['p' + String(i+1)][0])){
            text = myTimeTable[dayName]['p' + String(i+1)][0] + '\n' +  myTimeTable[dayName]['p' + String(i+1)][1] + '\n' +  myTimeTable[dayName]['p' + String(i+1)][2];
          } else {
            text = "";
          }
          timeTableOutput.drawText({
          fillStyle: color,
          x: dArray[d], y: hArray[i] + 12,
          fontSize: 36,
          fontFamily: font,
          text: text,
          lineHeight: 1.2,
          align: 'left',
          maxWidth: 260,
          fromCenter: false
          });
        }
      }

      var moveForm = $('<form/>', {'action': 'generate.php', 'method': 'post'});
      moveForm.append($('<input/>', {'type': 'hidden', 'name': 'img', 'value': timeTableOutput.getCanvasImage('jpeg', 0.8)}));
      moveForm.appendTo(document.body);
      moveForm.submit();
    }

    if (!selectBackground.prop('files').length || !file.type.match('image.*')) {
      alert('画像が選択されていません。');
      return;
    }

    timeTableOutput = $('<canvas id="timeTableOutput" width="2448" height="2448"></canvas>');

    $('p.download').css({
      display: 'block'
    });
    $(this).css({
      display: 'none'
    });

    fileReader = new FileReader();
    fileReader.onload = function(){
      var img = new Image();
      img.onload = function(){
        if(img.width > img.height){
          timeTableOutput.drawImage({
            source: fileReader.result,
            x: 1224, y: 1224,
            width: img.width/img.height*2448,
            height: 2448,
            sWidth: 2448,
            load: draw
          });
        } else {
          timeTableOutput.drawImage({
            source: fileReader.result,
            x: 1224, y: 1224,
            width: 2448,
            height: img.height/img.width*2448,
            sHeight: 2448,
            load: draw
          });
        }
      };
      img.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  });
});
