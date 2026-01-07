import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OperationInfoBarComponent } from "./operation-info-bar.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OperationInfoBarComponent", () => {

  let fixture: ComponentFixture<OperationInfoBarComponent>;
  let component: OperationInfoBarComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OperationInfoBarComponent]
    });

    fixture = TestBed.createComponent(OperationInfoBarComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
