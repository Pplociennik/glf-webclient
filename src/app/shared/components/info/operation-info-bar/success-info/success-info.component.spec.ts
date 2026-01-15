import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SuccessInfoComponent } from "./success-info.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SuccessInfoComponent", () => {

  let fixture: ComponentFixture<SuccessInfoComponent>;
  let component: SuccessInfoComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SuccessInfoComponent]
    });

    fixture = TestBed.createComponent(SuccessInfoComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
