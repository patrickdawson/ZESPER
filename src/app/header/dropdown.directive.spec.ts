/* tslint:disable:no-unused-variable */

import { DropdownDirective } from './dropdown.directive';

describe('Directive: Dropdown', () => {
    let testObject;

    beforeEach(function () {
        testObject = new DropdownDirective();
    });

    it('should create an instance', () => {
        expect(testObject).toBeTruthy();
    });

    it('returns false when asked for opened', function () {
        expect(testObject.opened).toBeFalsy();
    });

    it('returns true when asked for opened after open', function () {
        testObject.open();
        expect(testObject.opened).toBeTruthy();
    });

    it('returns false when asked for opened after open then close', function () {
        testObject.open();
        testObject.close();
        expect(testObject.opened).toBeFalsy();
    });

});
