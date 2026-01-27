import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UnverifiedUserDialogComponent } from "./unverified-user-dialog.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UnverifiedUserDialogComponent", () => {

  let fixture: ComponentFixture<UnverifiedUserDialogComponent>;
  let component: UnverifiedUserDialogComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UnverifiedUserDialogComponent]
    });

    fixture = TestBed.createComponent(UnverifiedUserDialogComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
