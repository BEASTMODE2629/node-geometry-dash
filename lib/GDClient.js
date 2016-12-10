"use strict";

const request = require("request");
const MainURL = "http://boomlings.com/database";
const EventEmitter = require("events");
class GDClient extends EventEmitter {
	constructor(options) {
		super()
		this.options = {
			username: "",
			password: ""
		}
		for(let i in options)
			this.options[i] = options[i];

		this.LEVEL_LENGTH = {};
		this.LEVEL_LENGTH.TINY = "0";
		this.LEVEL_LENGTH.SHORT = "1";
		this.LEVEL_LENGTH.MEDIUM = "2";
		this.LEVEL_LENGTH.LONG = "3";
		this.LEVEL_LENGTH.XL = "4";

		this.LEVEL_TYPE = {};
		this.LEVEL_TYPE.DOWNLOADS = "1";
		this.LEVEL_TYPE.LIKES = "2";
		this.LEVEL_TYPE.UPLOAD_DATE = "4";
		this.LEVEL_TYPE.UPLOAD_DATE_FEATURED = "6";
		this.LEVEL_TYPE.UPLOAD_DATE_STARS = "11";
	}
	login() {
		console.log("Not finished ¯\\_(ツ)_/¯");
	}
	levels(name, obj, cb) {
		let len = "-";
		let type = "0";
		let total = "0";
		if(typeof name === "object" || obj != undefined && (obj.len||obj.length)&&obj.type&&obj.total) {
			len = (name.length ? name.length : (name.len?name.len:"-")).toString();
			type = (name.type||type).toString();
			total = (name.total||total).toString();
		}
		let f="-";
		let or="-";
		let tp="-";
		let st="-";
		let page = 0;
		if(obj) {
		if(obj.featured)f=(obj.featured == true ? 1 : 0);
		if(obj.original)or=(obj.original == true ? 1 : 0);
		if(obj.twoPlayer)tp=(obj.twoPlayer == true ? 1 : 0);
		if(obj.star)st=(obj.star == true ? 1 : 0);
		if(obj.length)len=obj.length;
		if(obj.page)page=obj.page;
		if(name.name)name=name.name;
		}
		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJLevels21.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					str: name,
					total: total,
					len: len,
					type: type,
					featured: f,
					original: or,
					twoPlayer: tp,
					star: st,
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let levels = b.split("#")[0].split("|");
				let lvlArr = [];
				for(let i in levels) {
					if(levels[i] == "-1") {
						rej();
					} else  {
						let lData = levels[i].split(":");
						if(lData[11] == "50") {
							if(lData[21] == "1") {
								lData[11] = "Demon";
							} else if(lData[25] == "1") {
								lData[11] = "Auto";
							} else {
								lData[11] = "Insane";
							}
						}
						if(lData[11] == "40") {
							lData[11] = "Harder";
						} else if(lData[11] == "30") {
							lData[11] = "Hard";
						} else if(lData[11] == "20") {
							lData[11] = "Normal";
						} else if(lData[11] == "10") {
							lData[11] = "Easy";
						} else if(lData[11] == "0") {
							lData[11] = "N/A";
						}
						const lengtharr = [
							"Tiny",
							"Short",
							"Medium",
							"Long",
							"XL"
						];

						const parsedData = {
							name: lData[3],
							id: lData[1],
							author: {
								name: "",
								id: lData[7]
							},
							song: {},
							difficulty: lData[11],
							downloads: lData[13],
							likes: lData[19],
							stars: lData[27],
							featured: (lData[29] != 0 ? true : false),
							description: new Buffer(lData[33].toString(), "base64").toString(),
							length: lengtharr[parseInt(lData[35])],
							coins: lData[41],
							version: lData[5],
							verifiedCoins: (lData[43] == 1 ? true : false),
							requestedStars: lData[45]
						}
						let authors = b.split("#")[1].split("|");
						for(let a in authors) {
							if(authors[a].split(":")[0] == lData[7]) {
								parsedData.author.name = authors[a].split(":")[1];
							}
						}
						let songs = b.split("#")[2].split(":");
						if(lData[47] != "0") {
							for(let s in songs) {
								if(songs[s].split("~|~")[1] == lData[47]) {
									let song = songs[s].split("~|~");
									parsedData.song = {
										name: song[3],
										author: song[7],
										id: song[1],
										size: song[9] + "MB",
										url: decodeURIComponent( song[13] )
									}
								}
							}
						} else {
							lData[47] = lData[15];
							let mainSongs = {
							  "0": ["Stereo Madness", "ForeverBound"],
							  "1": ["Back On Track", "DJVI"],
							  "2": ["Polargeist", "Step"],
							  "3": ["Dry Out", "DJVI"],
							  "4": ["Base After Base", "DJVI"],
							  "5": ["Cant Let Go", "DJVI"],
							  "6": ["Jumper", "Waterflame"],
							  "7": ["Time Machine", "Waterflame"],
							  "8": ["Cycles", "DJVI"],
							  "9": ["xStep", "DJVI"],
							  "10": ["Clutterfunk", "Waterflame"],
							  "11": ["Theory of Everything", "DJ-Nate"],
							  "12": ["Electroman Adventures", "Waterflame"],
							  "13": ["Clubstep", "DJ-Nate"],
							  "14": ["Electrodynamix", "DJ-Nate"],
							  "15": ["Hexagon Force", "Waterflame"],
							  "16": ["Blast Processing", "Waterflame"],
							  "17": ["Theory of Everything 2", "DJ-Nate"],
							  "18": ["Geometrical Dominator", "Waterflame"],
							  "19": ["Deadlocked", "F-777"],
							  "20": ["Fingerbang", "MDK"] // why not kek
							} // Thanks meganukebmp/Nexrem (https://github.com/meganukebmp/Discord-GD-Stat/blob/master/resources/level/tracks.json) (modified)
							let song = mainSongs[lData[47]+""];
							parsedData.song = {
								name: song[0],
								author: song[1],
								id: lData[47],
								size: null,
								url: null
							}
						}
						lvlArr.push(parsedData)
					}
					
				}
				if(!cb || typeof cb !== "function")
					res(lvlArr)
				else {
					cb(lvlArr)
					return null;
				}
			})
		});
		name = name.toString();
		
		return Prom;
	}
	users(name,obj,cb) {
		let total = "0";
		let page  = "0";
		if(typeof name==="object") {
			total = name.total ? name.total : total;
			page  = name.page  ? name.page  : page;
			name  = name.name  ? name.name  : "16";
		}
		if(obj) {
		if(obj.total)total=obj.total;
		if(obj.page) page =obj.page;
		}
		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJUsers20.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					str: name,
					total: total,
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b)=>{
				if(b == "-1")
					rej();
				else {
					let users = b.split("#")[0].split("|");
					let userarr = [];
					for(let user of users) {
						user = user.split(":");
						const parsedData = {
							username: user[1],
							id: user[3],
							coins: user[5],
							userCoins: user[7],
							stars: user[23],
							demons: user[27],
							creatorPoints: user[25],
							extID: user[21]
						}
						userarr.push(parsedData);
					}
					if(!cb || typeof cb !== "function")
						res(userarr);
					else {
						cb(userarr);
						return null;
					}
				}
			});
		})
		return Prom;
	}
	user(extID, cb) {
		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJUserInfo20.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					targetAccountID: extID,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b)=>{
				if(b == "-1")
					rej();
				else {
					let user = b.split(":");
					
					const parsedData = {
						username: user[1],
						id: user[3],
						coins: user[5],
						userCoins: user[7],
						colors: {
							primary: user[9],
							secondary: user[11],
						},
						icons: {
							cube : user[25],
							ship : user[27],
							ball : user[29],
							ufo  : user[31],
							wave : user[33],
							robot: user[35]
						},
						glow: user[37]==true,
						youtube: user[23],
						stars: user[13],
						demons: user[15],
						creatorPoints: user[17],
						extID: user[41]
					}
					if(!cb || typeof cb !== "function")
						res(parsedData);
					else {
						cb(parsedData);
						return null;
					}
				}
			});
		})
		return Prom;
	}
	mapPacks(page="0", cb) {
		page = page.toString();
		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJMapPacks21.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b)=>{
				if(b == "-1")
					rej();
				else {
					let mapPacks = b.split("#")[0].split("|");
					let mapPackss = [];
					for(let mappack of mapPacks) {
						mappack = mappack.split(":");
						if(mappack[11]=="1")
							mappack[11] = "Easy";
						if(mappack[11]=="2")
							mappack[11] = "Normal";
						if(mappack[11]=="3")
							mappack[11] = "Hard";
						if(mappack[11]=="4")
							mappack[11] = "Harder";
						if(mappack[11]=="5")
							mappack[11] = "Insane";
						if(mappack[11]=="6")
							mappack[11] = "Demon";

						const parsedData = {
							name: mappack[3],
							id: mappack[1],
							levels: mappack[5].split(","),
							stars: mappack[7],
							coins: mappack[9],
							difficulty: mappack[11],
							rgb: mappack[13].split(",")
						}
						mapPackss.push(parsedData);
					}
					if(!cb || typeof cb !== "function")
						res(mapPackss)
					else {
						cb(mapPackss)
						return null;
					}
				}
			});
		})
		return Prom;
	}
	comments(level, page="0", cb) {
		page  = page.toString();
		level = level.toString();

		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJComments21.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					levelID: level,
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let comments = b.split("#")[0].split("|");
				let commentsa = [];
				for(let i in comments) {
					if(comments[i] == "-1" || comments[i] === "") {
						rej();
					} else  {
						let comment = comments[i].split("~");
						let parsedData = {
							comment: new Buffer(comment[1].toString(), "base64").toString(),
							username: comment[14],
							userID: comment[3],
							likes: comment[5],
							date: comment[11],
							commentID: comment[13]
						}
						commentsa.push(parsedData)
					}					
				}
				if(!cb || typeof cb !== "function")
					res(commentsa);
				else{
					cb(commentsa);
					return null;
				}
			})
		});
		
		return Prom;
	}
	accountComments(accountID, page="0",cb) {
		page  = page.toString();
		accountID = accountID.toString();

		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJAccountComments20.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					accountID: accountID,
					page: page,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let comments = b.split("#")[0].split("|");
				let commentsa = [];
				for(let i in comments) {
					if(comments[i] == "-1" || comments[i] === "") {
						rej();
					} else  {
						let comment = comments[i].split("~");
						let parsedData = {
							comment: new Buffer(comment[1].toString(), "base64").toString(),
							likes: comment[3],
							date: comment[5],
							commentID: comment[7]
						}
						commentsa.push(parsedData)
					}					
				}
				if(!cb || typeof cb !== "function")
					res(commentsa);
				else {
					cb(commentsa);
					return null;
				}
			})
		});
		
		return Prom;
	}
	leaderboards(type, cb) {

		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJScores20.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					type: type,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let scores = b.split("#")[0].split("|");
				let scoresa = [];
				for(let i in scores) {
					if(scores[i] == "-1") {
						rej();
					} else  {
						let score = scores[i].split(":");
						if(score[0] != "") {
							const parsedData = {
								username: score[1],
								id: score[3],
								coins: score[5],
								userCoins: score[7],
								stars: score[23],
								demons: score[27],
								creatorPoints: score[25],
								extID: score[21]
							}
							scoresa.push(parsedData);
						}
					}					
				}
				if(!cb)
					res(scoresa);
				else {
					cb(scoresa);
					return null;
				}
			})
		});
		
		return Prom;
	}
	song(id, cb) {
		let Prom = new Promise((res,rej)=> {
			request.post({
				url: `${MainURL}/getGJSongInfo.php`,
				form: {
					gameVersion: "20",
					binaryVersion: "29",
					songID: id,
					secret: "Wmfd2893gb7"
				}
			}, (e,r,b) => {
				let song = b.split("~|~");
				if(b=="-1") {
					rej();
				}
				else {
					let parsedData = {
						id: song[1],
						name: song[3],
						authorID: song[5],
						author: song[7],
						size: song[9]+"MB",
						url: decodeURIComponent(song[13])
					}
					if(!cb)
						res(parsedData);
					else {
						cb(parsedData);
						return null;
					}
				}
			})
		});
		
		return Prom;
	}
}

module.exports = GDClient;