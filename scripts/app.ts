const serverAddr = "http://" + window.location.host;
//const serverAddr = "http://localhost:8080";

const gamemodeIcons: any = {
	"creative": '<path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"/>',
	"survival": '<path d="M762-96 645-212l-88 88-28-28q-23-23-23-57t23-57l169-169q23-23 57-23t57 23l28 28-88 88 116 117q12 12 12 28t-12 28l-50 50q-12 12-28 12t-28-12Zm118-628L426-270l5 4q23 23 23 57t-23 57l-28 28-88-88L198-96q-12 12-28 12t-28-12l-50-50q-12-12-12-28t12-28l116-117-88-88 28-28q23-23 57-23t57 23l4 5 454-454h160v160ZM334-583l24-23 23-24-23 24-24 23Zm-56 57L80-724v-160h160l198 198-57 56-174-174h-47v47l174 174-56 57Zm92 199 430-430v-47h-47L323-374l47 47Zm0 0-24-23-23-24 23 24 24 23Z"/>',
	"spectator": '<<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>',
	"adventure": '<<path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>'
}
const opIcons: any = {
	"true": '<path d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/>',
	"false": '<path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>'
}

interface Data {
	players: Map<string, Map<string, object>>;
	processCPU: number;
	processRAM: number;
	systemCPU: number;
	systemRAM: number;
	name: string;
	playerCount: number;
	maxPlayerCount: number;
}

function getPerformanceInfo(): Promise<Data> {
	
	return new Promise((resolve, reject) => {

		let xhtp = new XMLHttpRequest();
		xhtp.open("GET", window.location.host + "/performanceDetails");
		xhtp.setRequestHeader("Content-Type", "application/json");

		var response: Data;

		xhtp.onload = function(e) {
			let json = JSON.parse(xhtp.responseText);
			response = json as Data;
			let players = new Map<string, Map<string, object>>;
			for (const k in json.players) {
				players.set(k, new Map(Object.entries(json.players[k])));
			}
			response.players = players;
			resolve(response);
		}
		xhtp.send();
	
	});


}

async function updatePage() {
	let data = await getPerformanceInfo();

	document.getElementById("name").innerText = data.name;

	document.getElementById("systemCPUText").innerText = (Math.round(data.systemCPU * 100) / 100).toString() + "%";
	document.getElementById("processCPUText").innerText = (Math.round(data.processCPU * 100) / 100).toString() + "%";

	document.getElementById("systemRAMText").innerText = (Math.round(data.systemRAM * 100) / 100).toString() + "%";
	document.getElementById("processRAMText").innerText = (Math.round(data.processRAM * 100) / 100).toString() + "%";
	
	let array = 377;
	document.getElementById("systemCPUBar").style.strokeDashoffset = (array - array * (data.systemCPU / 100)).toString();
	document.getElementById("processCPUBar").style.strokeDashoffset = (array - array * (data.processCPU / 100)).toString();

	document.getElementById("systemRAMBar").style.strokeDashoffset = (array - array * (data.systemRAM / 100)).toString();
	document.getElementById("processRAMBar").style.strokeDashoffset = (array - array * (data.processRAM / 100)).toString();


	document.getElementById("playerCount").innerText = data.playerCount.toString() + "/" + data.maxPlayerCount.toString();
	document.getElementById("players").innerHTML = "";
	data.players.forEach((value, key) => {
		let element = document.createElement("li");
		let div = document.createElement("div");
		let p = document.createElement("p");
		let gsvg = document.getElementById("templateIcon").cloneNode(true) as SVGElement;
		let osvg = document.getElementById("templateIcon").cloneNode(true) as SVGElement;

		gsvg.innerHTML = gamemodeIcons[value.get("gamemode") as unknown as string];
		osvg.innerHTML = opIcons[value.get("op") as unknown as string];

		p.innerText = value.get("name") as unknown as string;
		div.classList.add("player");
		div.appendChild(p);

		div.append(osvg);
		div.append(gsvg);
		
		element.appendChild(div);
		
		document.getElementById("players").appendChild(element);
	})
}

function start() {
	updatePage();
	setInterval(() => {
		updatePage();
	}, 333);
}