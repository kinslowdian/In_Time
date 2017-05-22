// DEBUG
var trace = function(msg){ console.log(msg); };

var onEnterFrame;
var timeObj;

var scene;

var testTimer;

function pageLoad_init()
{
	trace("pageLoad_init();");

	time_init();

	scene_init("fx-morning");

	onEnterFrame_init(true);

	test();
}

function test()
{
	testTimer = setTimeout(scene_apply_light, 6 * 1000, "fx-noon");
}

function onEnterFrame_init(allow)
{
	if(!onEnterFrame || onEnterFrame == null)
	{
		onEnterFrame = {};
		onEnterFrame.run = false;
		onEnterFrame.func = onEnterFrame_event;
		onEnterFrame.list = new Array();

		onEnterFrame.list.push(time_loop);
	}

	if(allow && !onEnterFrame.run)
	{
		onEnterFrame.run = true;

		window.requestAnimationFrame(onEnterFrame.func);
	}

	else
	{
		window.cancelAnimationFrame(onEnterFrame.func);
		onEnterFrame.run = false;
	}
}

function onEnterFrame_event()
{
	for(var i in onEnterFrame.list)
	{
		onEnterFrame.list[i]();
	}

	if(onEnterFrame.run)
	{
		window.requestAnimationFrame(onEnterFrame.func);
	}
}

function time_init()
{
	timeObj = {};

	timeObj.HS = 0;
	timeObj.MS = 0;
	timeObj.SS = 0;
	timeObj.firstRun = true;
	timeObj.display = "";
	timeObj.light = "";
}

function time_loop()
{
	timeObj.date = new Date();
	timeObj.H = timeObj.date.getHours();
	timeObj.M = timeObj.date.getMinutes();
	timeObj.S = timeObj.date.getSeconds();

	// CALL ONCE
	if(timeObj.firstRun)
	{
		timeObj.firstRun = false;
		
		timeObj.HS = timeObj.H;
		timeObj.MS = timeObj.M;
		timeObj.SS = timeObj.S;

		timeObj.display = timeObj.HS + " " + timeObj.MS + " " + timeObj.SS;

		time_light_sort();
	}

	else
	{
		time_sort();
	}
}

function time_sort()
{
	var timeChange = false;

	if(timeObj.HS != timeObj.H)
	{
		timeObj.HS = timeObj.H;
		timeChange = true;
	}

	if(timeObj.MS != timeObj.M)
	{
		timeObj.MS = timeObj.M;
		timeChange = true;
	}

	if(timeObj.SS != timeObj.S)
	{
		timeObj.SS = timeObj.S;
		timeChange = true;
	}

	if(timeChange)
	{
		timeObj.display = timeObj.HS + " " + timeObj.MS + " " + timeObj.SS;
		// trace("TIME == " + timeObj.display);
	}

	if(timeObj.SS == 0)
	{
		time_light_sort();
	}
}

function time_light_sort()
{
	// NIGHT 0 - 4
	if(timeObj.HS >= 0 && timeObj.HS <= 4)
	{
		timeObj.light = "NIGHT";
	}

	// MORNING 5 - 11
	else if(timeObj.HS >= 5 && timeObj.HS <= 11)
	{
		timeObj.light = "MORNING";
	}

	// NOON 12 - 16
	else if(timeObj.HS >= 12 && timeObj.HS <= 16)
	{
		timeObj.light = "NOON";
	}

	// EVENING 17 - 20
	else if(timeObj.HS >= 17 && timeObj.HS <= 20)
	{
		timeObj.light = "EVENING";
	}

	// NIGHT 21 - 23
	else
	{
		timeObj.light = "NIGHT";
	}

	trace(timeObj.light);
}

function scene_init(fx)
{
	scene = {};
	scene.elements = new Array();
	scene.elements.push(document.querySelector(".display-content .land0"));
	scene.elements.push(document.querySelector(".display-content .land1"));
	scene.elements.push(document.querySelector(".display-content .land2"));
	scene.fxCurrent = fx;
	scene.fxFirst = true;

	scene_apply_light(scene.fxCurrent);
}

function scene_apply_light(fx)
{
	if(fx != scene.fxCurrent || scene.fxFirst)
	{
		if(scene.fxCurrent)
		{
			for(var i in scene.elements)
			{
				scene.elements[i].classList.remove(scene.fxCurrent);
			}
		}

		scene.fxCurrent = fx;

		for(var j in scene.elements)
		{
			scene.elements[j].classList.add(scene.fxCurrent);
		}

		if(scene.fxFirst)
		{
			scene.fxFirst = false;
		}
	}
}






