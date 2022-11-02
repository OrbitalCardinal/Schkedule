import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'ung-select-input',
    templateUrl: './ung-select-input.component.html',
    styleUrls: ['./ung-select-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: UngSelectInput,
            multi: true
        }
    ]
})

export class UngSelectInput implements ControlValueAccessor {
    onChange = (_: any) => {};
    onTouched = () => {};
    value: any = null;
    changeValue($event: any) {
        this.onChange($event.target.value);
        this.onTouched();
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
    @Input() options: string[] = [];
}