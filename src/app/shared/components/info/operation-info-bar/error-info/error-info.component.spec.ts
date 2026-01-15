import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ErrorInfoComponent } from "./error-info.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ErrorInfoComponent", () => {

  let fixture: ComponentFixture<ErrorInfoComponent>;
  let component: ErrorInfoComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ErrorInfoComponent]
    });

    fixture = TestBed.createComponent(ErrorInfoComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });

});
