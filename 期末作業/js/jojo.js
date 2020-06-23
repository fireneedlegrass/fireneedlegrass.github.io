var i = 0;
var yes = new Audio('https://fireneedlegrass.github.io/%E6%9C%9F%E6%9C%AB%E4%BD%9C%E6%A5%AD/mp3/yes.mp3');
var no = new Audio('https://fireneedlegrass.github.io/%E6%9C%9F%E6%9C%AB%E4%BD%9C%E6%A5%AD/mp3/no.mp3');
var backgroundAudio=new Audio('https://fireneedlegrass.github.io/%E6%9C%9F%E6%9C%AB%E4%BD%9C%E6%A5%AD/mp3/Sono%20Chi%20no%20Kioku%20end%20of%20THE%20WORLD.mp3');
var data;
var score = 0;
function showans(now) {
    $('#conta').empty();
    $ans = $('<p>').text("答錯了，答案為：\n(" + (Number(now.a) + 1) + ")" + now.op[now.a]);
    $ans.html($ans.html().replace('\n', '<br/>'));
    $('#conta').append($ans);
    if (now.apic != undefined) {
        $qp = $('<img>').attr('src', 'https://fireneedlegrass.github.io/%E6%9C%9F%E6%9C%AB%E4%BD%9C%E6%A5%AD'+now.apic).addClass('mdlpic');
        $('#conta').append($qp);
        $('#conta').css('top', '0');
    } else {
        $('#conta').css('top', 'calc(50% - 250px)');
    }
    i++;
    if (i < data.length) {
        $next = $('<div>').append($('<div>').text("下一題").addClass('title').css('font-size', '60px')).addClass('bottom').css('margin-top', '25px');
    } else {
        $next = $('<div>').append($('<div>').text("看分數").addClass('title').css('font-size', '60px')).addClass('bottom').css('margin-top', '25px');
    }
    $('#conta').append($next);
    $next.on('click', (event) => {
        if (i < data.length) {
            setq(data[i]);
        }
        else {
            countscore();
            return;
        }
    })
}
function countscore() {
    $('#conta').empty();
    $('#conta').css('top', '0');
    $scorebar = $('<h1>').text(score + "/" + data.length).addClass('title');
    $('#conta').append($('<h1>').text("分數").addClass('bigmdlt')).append($scorebar);
}
function setq(now) {
    $('#conta').empty();
    let $ops = [];
    $que = $('<p>').text(now.q);
    $('#conta').append($que);
    if (now.qpic != undefined) {
        $qp = $('<img>').attr('src', 'https://fireneedlegrass.github.io/%E6%9C%9F%E6%9C%AB%E4%BD%9C%E6%A5%AD'+now.qpic).addClass('mdlpic');
        $('#conta').append($qp);
        $('#conta').css('top', '0');
    } else {
        $('#conta').css('top', 'calc(50% - 250px)');
    }
    for (let j = 0; j < 3; j++) {
        $ops[j] = $('<p>').text("(" + (j + 1) + ")" + now.op[j]).addClass('option');
        if (j == now.a)
            $ops[j].attr('ans', true);
        $ops[j].on('click', (event) => {
            if ($(event.target).attr('ans') == "true") {
                yes.currentTime = 0;
                yes.play();
                score++;
                i++;
                if (i < data.length) {
                    setq(data[i]);
                    return;
                }
                else {
                    countscore();
                    return;
                }
            }
            else {
                no.currentTime = 0;
                no.play();
                showans(now);
                return;
            }

        })
    }
    $('#conta').append($ops[0]).append($ops[1]).append($ops[2]);
}
$(() => {
    $('#begin').on('click', () => {
        fetch('https://fireneedlegrass.github.io/期末作業/json/qu.json')
            .then(response => {
                return response.json();
            })
            .then(ques => {
                data = ques.map(x => x)
                for (let j = 0; j < 50; j++) {
                    let ran1 = Math.floor(Math.random() * data.length);
                    let temp = data[ran1];
                    let ran2 = Math.floor(Math.random() * data.length);
                    data[ran1] = data[ran2];
                    data[ran2] = temp;
                }
                backgroundAudio.play();
                i = 0;
                setq(data[i]);
            })
            .catch(error => console.error(error))
    })
})
