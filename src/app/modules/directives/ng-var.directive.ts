import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appNgVar]',
})
export class NgVarDirective {
  public context: any = {};

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  private updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
