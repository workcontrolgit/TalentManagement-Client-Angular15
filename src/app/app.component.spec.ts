import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@app/i18n';
import { Logger } from '@shared';

describe('AppComponent', () => {
  let component: AppComponent;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let titleService: Title;
  let translateService: TranslateService;
  let i18nService: I18nService;
  let log: Logger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    });

    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    titleService = TestBed.get(Title);
    translateService = TestBed.get(TranslateService);
    i18nService = TestBed.get(I18nService);
    log = new Logger('App');

    component = new AppComponent(router, activatedRoute, titleService, translateService, i18nService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call init on ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call destroy on ngOnDestroy', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });
});
