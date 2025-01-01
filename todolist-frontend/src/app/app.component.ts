import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { NotificationComponent } from "./shared/components/notification/notification.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NotificationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {}
