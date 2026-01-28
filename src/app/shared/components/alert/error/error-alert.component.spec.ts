import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ErrorAlertComponent } from "./error-alert.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ErrorAlertComponent", () => {

  let fixture: ComponentFixture<ErrorAlertComponent>;
  let component: ErrorAlertComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ErrorAlertComponent]
    });

    fixture = TestBed.createComponent(ErrorAlertComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
