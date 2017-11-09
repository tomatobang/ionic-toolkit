import { Component, OnInit } from "@angular/core";
import { Media, MediaObject } from "@ionic-native/media";
import { ElementRef } from "@angular/core";

import { NavController, IonicPage } from "ionic-angular";

import { Platform } from "ionic-angular";
import { Gesture } from "ionic-angular/gestures/gesture";

import { IBeaconService } from "../../providers/_utils/ibeacon.service";
import { SocketIOService } from "../../providers/_utils/socket.io.service";

declare var window;

@IonicPage()
@Component({
	selector: "page-test",
	templateUrl: "test.html",
	providers: [Media]
})
export class TestPage implements OnInit {
	el: HTMLElement;
	msg: string;
	userid:string;
	constructor(
		public navCtrl: NavController,
		public platform: Platform,
		private elRef: ElementRef,
		private beancon: IBeaconService,
		private chatService: SocketIOService
	) {
		this.el = elRef.nativeElement;
		platform.ready().then(() => {
			//beancon.init();
		});
	}

	ngOnInit() {
		this.chatService.getMessage().subscribe(msg => {
			this.msg = "收到消息: " + msg;
		});

		this.chatService.receiveOtherPos().subscribe(msg => {
			this.msg = "收到对方位置: " + msg;
		});

		this.chatService.sendPos_error().subscribe(msg => {
			this.msg = "发送自身位置: " + msg;
		});

		this.chatService.PleasePostPos().subscribe(data =>{
			let send_userid = data.send_userid;
	 		this.chatService.postMyPos(send_userid,send_userid+"你好，这是我的位置");
		});
	}

	login(userid){
		this.userid = userid;
		this.chatService.login(userid);
	}

	sendMsg(msg) {
		//this.chatService.sendMessage(msg);
		this.chatService.requestOtherPos(msg);
	}
}
