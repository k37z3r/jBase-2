/**
 * @file src/modules/dom/states.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for checking element states (e.g., visibility, checked, disabled).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */
import { jBase } from '../../core';
/**
 * * Gets or sets the 'checked' state of checkboxes and radio buttons.
 * @example checked() => Gets the checked state of the first matched element.
 * @example checked(true) => Checks the first matched element.
 * @param state (Optional) `true` to check, `false` to uncheck. If undefined, acts as a getter.
 * @returns Boolean (getter) or the current jBase instance (setter).
 */
export declare function checked(this: jBase, state?: boolean): boolean | jBase;
/**
 * * Gets or sets the 'selected' state of `<option>` elements.
 * @example selected() => Gets the selected state of the first matched option element.
 * @example selected(true) => Selects the first matched option element.
 * @param state (Optional) `true` to select, `false` to deselect. If undefined, acts as a getter.
 * @returns Boolean (getter) or the current jBase instance (setter).
 */
export declare function selected(this: jBase, state?: boolean): boolean | jBase;
/**
 * * Enables or disables form fields and buttons. Additionally toggles the CSS class `.disabled`.
 * @example disabled() => Gets the disabled state of the first matched element.
 * @example disabled(true) => Disables the first matched element.
 * @param state (Optional) `true` to disable, `false` to enable. If undefined, acts as a getter.
 * @returns Boolean (getter) or the current jBase instance (setter).
 */
export declare function disabled(this: jBase, state?: boolean): boolean | jBase;
/**
 * * ALIAS for .checked(true). Checks the matched elements.
 * @example check() => Checks all matched checkboxes/radio buttons.
 * @returns The current jBase instance.
 */
export declare function check(this: jBase): jBase;
/**
 * * ALIAS for .checked(false). Unchecks the matched elements.
 * @example uncheck() => Unchecks all matched checkboxes/radio buttons.
 * @returns The current jBase instance.
 */
export declare function uncheck(this: jBase): jBase;
/**
 * * ALIAS for .selected(true). Selects the matched <option> elements.
 * @example select() => Selects all matched option elements.
 * @returns The current jBase instance.
 */
export declare function select(this: jBase): jBase;
/**
 * * ALIAS for .disabled(true). Disables the matched elements and adds the 'disabled' class.
 * @example disable() => Disables all matched elements.
 * @returns The current jBase instance.
 */
export declare function disable(this: jBase): jBase;
/**
 * * ALIAS for .disabled(false). Enables the matched elements and removes the 'disabled' class.
 * @example enable() => Enables all matched elements.
 * @returns The current jBase instance.
 */
export declare function enable(this: jBase): jBase;
//# sourceMappingURL=states.d.ts.map