import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ResendButtonComponent } from "./resend-button.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ResendButtonComponent", () => {

  let fixture: ComponentFixture<ResendButtonComponent>;
  let component: ResendButtonComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ResendButtonComponent]
    });

    fixture = TestBed.createComponent(ResendButtonComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
