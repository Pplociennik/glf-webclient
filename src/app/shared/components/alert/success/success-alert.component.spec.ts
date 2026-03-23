import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SuccessAlertComponent } from "./success-alert.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SuccessAlertComponent", () => {

  let fixture: ComponentFixture<SuccessAlertComponent>;
  let component: SuccessAlertComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SuccessAlertComponent]
    });

    fixture = TestBed.createComponent(SuccessAlertComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
