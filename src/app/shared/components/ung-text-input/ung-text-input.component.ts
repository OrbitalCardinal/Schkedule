import { Component, EventEmitter, Input, Output, Self } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    'selector': 'ung-text-input',
    'templateUrl': './ung-text-input.component.html',
    'styleUrls': ['./ung-text-input.component.scss'],
})

export class UngTextInput implements ControlValueAccessor {

    constructor(@Self() private controlDirective: NgControl) {
        controlDirective.valueAccessor = this;
      }

    onChange = (_: any) => {};
    onTouched = () => {};
    value: string = '';

    changeValue($event: any) {
        this.onChange($event.target.value);
        this.onTouched();
        this.controlDirective.control?.updateValueAndValidity();
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    @Input() label: string = '';
    @Input() variant: string =  '';
    @Input() leadingIcon: string = '';
    @Input() trailingIcon: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() name: string = '';
}
