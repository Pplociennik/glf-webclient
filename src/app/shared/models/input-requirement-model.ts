/**
 * Represents a validation requirement with its check function and status.
 * Used by input components to display validation feedback to users.
 */
export interface InputRequirementModel {
    description: string;
    isValid: boolean;
    validator: (value: string) => boolean;
}    
