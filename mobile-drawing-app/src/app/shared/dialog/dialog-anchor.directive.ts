import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Directive({
  selector: '[appDialogAnchor]'
})
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    createDialog(dialogComponent: new() => DialogComponent): ComponentRef<DialogComponent> {
        this.viewContainer.clear();

        const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        const dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);

        dialogComponentRef.instance.close.subscribe(() => {
            dialogComponentRef.destroy();
        });

        return dialogComponentRef;
    }
}
