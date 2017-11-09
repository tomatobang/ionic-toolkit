import { NgModule } from "@angular/core";
import { RongyunPage } from "./rongyun";
import { IonicPageModule } from "ionic-angular";
import { RongYunService } from "../../../providers/_utils/rongyun.service";
import { RongyunUtil } from "../../../providers/_utils/rongyun.util";


@NgModule({
	declarations: [RongyunPage],
	imports: [IonicPageModule.forChild(RongyunPage)],
	providers: [RongYunService,RongyunUtil],
})
export class RongyunPageModule {}
