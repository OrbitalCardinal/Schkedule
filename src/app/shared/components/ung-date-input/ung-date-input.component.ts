import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'ung-date-input',
    templateUrl: './ung-date-input.component.html',
    styleUrls: ['./ung-date-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: UngDateInput,
            multi: true
        }
    ]
})

export class UngDateInput implements ControlValueAccessor {
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
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() min: string = '';
    @Input() max: string = '';
}