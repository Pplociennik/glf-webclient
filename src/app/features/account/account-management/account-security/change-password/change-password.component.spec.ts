import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangePasswordComponent } from "./change-password.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ChangePasswordComponent", () => {

  let fixture: ComponentFixture<ChangePasswordComponent>;
  let component: ChangePasswordComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ChangePasswordComponent]
    });

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
