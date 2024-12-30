import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { appRoutes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { TaskGateway } from "./tasks/domain/interfaces/task-gateway";
import { TaskApiService } from "./tasks/infrastructure/gateways/task-api.service";
import { AuthGateway } from "./auth/domain/interfaces/auth-gateway";
import { AuthApiService } from "./auth/infrastructure/gateways/auth-api.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(), provideHttpClient(withFetch()),
    { provide:  TaskGateway, useClass: TaskApiService },
    { provide:  AuthGateway, useClass: AuthApiService }, provideAnimationsAsync(),
  ],
};
